import GoodsGroupRregister from "components/goodsGroup/register";
import { useEffect, useState } from "react";
import { detailPageActions } from "reducers/goodsGroup/detailPage";
import { goodsGroupImageActions } from "reducers/goodsGroup/image";
import { goodsGroupRegisterActions } from "reducers/goodsGroup/register";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupRegisterContainer = () => {
  const {
    user,
    productList,
    categoryList,
    manufacturerList,
    imageUpload,
    detailPage,
    groupRegister,
  } = useAppSelector((state) => ({
    user: state.user,
    productList: state.vendorProduct.findAll,
    categoryList: state.vendorProduct.findAllCategory,
    manufacturerList: state.vendorProduct.findManufacturerByProductId,
    imageUpload: state.goodsGroupImage,
    detailPage: state.detailPage,
    groupRegister: state.goodsGroupRegister,
  }));
  const dispatch = useAppDispatch();
  const [newCategory, setNewCategory] = useState<{ [key: string]: any }[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = ({ data }: { data: object }) => {
    dispatch(
      goodsGroupRegisterActions.postRegister({
        data: { vendorId: user.vendorId, ...data },
      })
    );
  };

  const onSelectManufact = (id: string) => {
    const data = {
      productId: id,
      isDesc: false,
    };
    dispatch(vendorProductActions.findAllCategory({ data }));
    dispatch(vendorProductActions.findManufacturerByProductId({ data }));
  };

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
    console.log("업로드");
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
    if (categoryList.success) {
      categoryList.data.map((list1st: any) => {
        category.push({
          id: list1st.id,
          description: list1st.description,
          checked: false,
          category2nd: list1st.category2nd.map((list2nd: any) => {
            return {
              category1stId: list2nd.category1stId,
              id: list2nd.id,
              description: list2nd.description,
              checked: false,
              category3rd: list2nd.category3rd.map((list3rd: any) => {
                return {
                  category2ndId: list3rd.category2ndId,
                  id: list3rd.id,
                  description: list3rd.description,
                  checked: false,
                };
              }),
            };
          }),
        });
      });
    }
    setNewCategory(category);
  }, [categoryList]);

  useEffect(() => {
    if (groupRegister.success) {
      dispatch(goodsGroupRegisterActions.reset({}));
      setModalVisible(true);
    }
  }, [groupRegister]);

  useEffect(() => {
    dispatch(goodsGroupRegisterActions.reset({}));
    dispatch(vendorProductActions.findAll("findAll"));
    dispatch(vendorProductActions.reset("findAllCategory"));
    dispatch(vendorProductActions.reset("findManufacturerByProductId"));
    dispatch(detailPageActions.reset({}));
    return () => {
      dispatch(goodsGroupRegisterActions.reset({}));
      dispatch(vendorProductActions.reset("findAll"));
      dispatch(vendorProductActions.reset("findAllCategory"));
      dispatch(vendorProductActions.reset("findManufacturerByProductId"));
      dispatch(detailPageActions.reset({}));
    };
  }, [dispatch]);

  return (
    <GoodsGroupRregister
      user={user}
      productList={productList.data}
      categoryList={newCategory}
      manufacturerList={manufacturerList.data}
      imageUpload={imageUpload}
      detailPage={detailPage}
      setNewCategory={setNewCategory}
      onSubmit={onSubmit}
      onSelectManufact={onSelectManufact}
      onImageUpload={onImageUpload}
      onDetailUpload={onDetailUpload}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default GoodsGroupRegisterContainer;
