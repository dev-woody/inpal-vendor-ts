import GoodsGroupRregister from "components/goodsGroup/register";
import { useEffect, useState } from "react";
import { detailPageActions } from "reducers/goodsGroup/detailPage";
import { goodsGroupImageActions } from "reducers/goodsGroup/image";
import { goodsGroupRegisterActions } from "reducers/goodsGroup/register";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupRegisterContainer = () => {
  const {
    user,
    productList,
    propertyList,
    categoryList,
    manufacturerList,
    imageUpload,
    detailPage,
    groupRegister,
  } = useAppSelector((state) => ({
    user: state.user,
    productList: state.vendorProduct.findAll,
    propertyList: state.vendorProduct.findAllProperty,
    categoryList: state.vendorProduct.findAllCategory,
    manufacturerList: state.vendorProduct.findManufacturerByProductId,
    imageUpload: state.goodsGroupImage,
    detailPage: state.detailPage,
    groupRegister: state.goodsGroupRegister,
  }));
  const dispatch = useAppDispatch();
  const [newCategory, setNewCategory] = useState<{ [key: string]: any }[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: object) => {
    dispatch(
      vendorGoodsGroupActions.postRegister({ vendorId: user.vendorId, ...data })
    );
  };

  const onSelectProduct = (id: string) => {
    const data = {
      productId: id,
      isDesc: false,
    };
    dispatch(vendorProductActions.findAllCategory(data));
    dispatch(vendorProductActions.findManufacturerByProductId(data));
    dispatch(vendorProductActions.findAllProperty(data));
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
      categoryList.data.category1sts.map((list1st: any) => {
        category.push({
          id: list1st.category1st.id,
          description: list1st.category1st.description,
          checked: false,
          category2nd: list1st.category2nds.map((list2nd: any) => {
            return {
              category1stId: list2nd.category2nd.ownerId,
              id: list2nd.category2nd.id,
              description: list2nd.category2nd.description,
              checked: false,
              category3rd: list2nd.category3rds.map((list3rd: any) => {
                return {
                  category2ndId: list3rd.category3rd.ownerId,
                  id: list3rd.category3rd.id,
                  description: list3rd.category3rd.description,
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
      dispatch(vendorGoodsGroupActions.reset("register"));
      setModalVisible(true);
    }
  }, [groupRegister]);

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.reset("register"));
    dispatch(vendorProductActions.findAll(false));
    dispatch(vendorProductActions.reset("findAllCategory"));
    dispatch(vendorProductActions.reset("findManufacturerByProductId"));
    dispatch(detailPageActions.reset({}));
    return () => {
      dispatch(vendorGoodsGroupActions.reset("register"));
      dispatch(vendorProductActions.reset("findAll"));
      dispatch(vendorProductActions.reset("findAllCategory"));
      dispatch(vendorProductActions.reset("findManufacturerByProductId"));
      dispatch(detailPageActions.reset({}));
    };
  }, []);

  return (
    <GoodsGroupRregister
      user={user}
      productList={productList.data}
      propertyList={propertyList.data}
      categoryList={newCategory}
      manufacturerList={manufacturerList.data}
      imageUpload={imageUpload}
      detailPage={detailPage}
      setNewCategory={setNewCategory}
      onSubmit={onSubmit}
      onSelectProduct={onSelectProduct}
      onImageUpload={onImageUpload}
      onDetailUpload={onDetailUpload}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default GoodsGroupRegisterContainer;
