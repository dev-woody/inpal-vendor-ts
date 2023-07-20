import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsGroupDetail from "components/goodsGroup/update";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { detailPageActions } from "reducers/goodsGroup/detailPage";
import { goodsGroupUpdateActions } from "reducers/goodsGroup/update";
import { goodsGroupImageActions } from "reducers/goodsGroup/image";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";

const GoodsGroupUpdateContainer = () => {
  const {
    user,
    goodsGroup,
    productList,
    manufacturerList,
    categoryList,
    imageUpload,
    detailPage,
    updateResult,
  } = useAppSelector((state) => ({
    user: state.user,
    goodsGroup: state.vendorGoodsGroup.findById,
    productList: state.vendorProduct.findAll,
    categoryList: state.vendorProduct.findAllCategory,
    manufacturerList: state.vendorProduct.findManufacturerByProductId,
    imageUpload: state.goodsGroupImage,
    detailPage: state.detailPage,
    updateResult: state.goodsGroupUpdate,
  }));
  const [newCategory, setNewCategory] = useState<{ [key: string]: any }[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    num: string
  ) => {
    const files = e.target.files ? e.target.files : "";
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("vendorId", user.vendorId);
    formData.append("num", num);
    formData.append("imageKind", num === "0" ? "HEAD" : "NORMAL");
    dispatch(goodsGroupImageActions.postUpload({ formData }));
  };

  const onDetailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? e.target.files : "";
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("vendorId", user.vendorId);
    dispatch(detailPageActions.postUpload({ formData }));
  };

  useEffect(() => {
    let category: { [key: string]: any }[] = [];
    if (categoryList.success && goodsGroup.success) {
      const categoryInfo = goodsGroup?.data?.productCategoryInfo;
      const selectCategory1st = categoryInfo?.productCategory1stInfos.map(
        (list: any) => {
          return {
            id: list.productCategory1st.id,
            description: list.productCategory1st.description,
          };
        }
      );
      const selectCategory2nd = categoryInfo?.productCategory2ndInfos.map(
        (list: any) => {
          return {
            id: list.productCategory2nd.id,
            description: list.productCategory2nd.description,
          };
        }
      );
      const selectCategory3rd = categoryInfo?.productCategory3rdInfos.map(
        (list: any) => {
          return {
            id: list.productCategory3rd.id,
            description: list.productCategory3rd.description,
          };
        }
      );
      categoryList.data.map((list1st: any) => {
        category.push({
          id: list1st.id,
          description: list1st.description,
          checked: false,
          category2nd: list1st.category2nd.map((list2nd: any) => {
            return {
              id: list2nd.id,
              description: list2nd.description,
              checked: false,
              category3rd: list2nd.category3rd.map((list3rd: any) => {
                return {
                  id: list3rd.id,
                  description: list3rd.description,
                  checked: false,
                };
              }),
            };
          }),
        });
      });
      category.map((list1st: any) => {
        for (let i = 0; i < selectCategory1st.length; i++) {
          if (selectCategory1st[i].id === list1st.id) {
            list1st.checked = true;
          }
        }
        if (list1st.category2nd) {
          const category2nd = list1st.category2nd;
          category2nd.map((list2nd: any) => {
            for (let i = 0; i < selectCategory2nd.length; i++) {
              if (selectCategory2nd[i].id === list2nd.id) {
                list2nd.checked = true;
              }
            }
            if (category2nd.category3rd) {
              const category3rd = category2nd.category3rd;
              category3rd.map((list3rd: any) => {
                for (let i = 0; i < selectCategory3rd.length; i++) {
                  if (selectCategory3rd[i].id === list3rd.id) {
                    list3rd.checked = true;
                  }
                }
              });
            }
          });
        }
      });
    }
    setNewCategory(category);
  }, [categoryList, goodsGroup]);

  useEffect(() => {
    if (goodsGroup.success) {
      const data = {
        productId: goodsGroup?.data?.product.id,
        isDesc: false,
      };
      dispatch(
        vendorProductActions.findAllCategory({
          data,
        })
      );
      dispatch(vendorProductActions.findManufacturerByProductId({ data }));
    }
  }, [dispatch, goodsGroup]);

  const onSubmit = ({ data }: { data: any }) => {
    dispatch(
      goodsGroupUpdateActions.postUpdate({
        data: {
          id: id,
          vendorId: user.vendorId,
          itemPerLine: Number(data.itemPerLine),
          productId: goodsGroup.data?.product?.id,
          ...data,
        },
      })
    );
  };

  useEffect(() => {
    if (updateResult.success) {
      setModalVisible(true);
      dispatch(goodsGroupUpdateActions.reset({}));
    }
  }, [updateResult]);

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.findAll(id));
    dispatch(vendorProductActions.findAll({}));
    return () => {
      dispatch(vendorGoodsGroupActions.reset("findAll"));
    };
  }, []);

  return (
    <GoodsGroupDetail
      user={user}
      id={id}
      goodsGroup={goodsGroup}
      productList={productList.data}
      manufacturerList={manufacturerList.data}
      categoryList={newCategory}
      imageUpload={imageUpload}
      detailPage={detailPage}
      onImageUpload={onImageUpload}
      onDetailUpload={onDetailUpload}
      setNewCategory={setNewCategory}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default GoodsGroupUpdateContainer;
