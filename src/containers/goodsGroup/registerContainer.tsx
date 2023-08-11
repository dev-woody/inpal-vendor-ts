import GoodsGroupRregister from "components/goodsGroup/register";
import { useEffect, useState } from "react";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { checkStatus } from "types/globalTypes";

const GoodsGroupRegisterContainer = () => {
  const {
    user,
    productList,
    propertyList,
    categoryList,
    manufacturerList,
    goodsSpecList,
    groupRegister,
  } = useAppSelector((store) => ({
    user: store.user,
    productList: store.vendorProduct.findAll,
    propertyList: store.vendorProduct.findAllProperty,
    categoryList: store.vendorProduct.findAllCategory,
    manufacturerList: store.vendorProduct.findManufacturerByProductId,
    goodsSpecList: store.vendorGoodsSpec.findAllByProductId,
    groupRegister: store.vendorGoodsGroup.register,
  }));
  const dispatch = useAppDispatch();
  const [newCategory, setNewCategory] = useState<{ [key: string]: any }[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: object) => {
    dispatch(
      vendorGoodsGroupActions.register({
        vendorId: user.vendorId,
        ...data,
      })
    );
  };

  const onSelectProduct = (id: string) => {
    const data = {
      productId: id,
      isDesc: true,
    };
    dispatch(vendorProductActions.findAllCategory(data));
    dispatch(vendorProductActions.findManufacturerByProductId(data));
    dispatch(vendorProductActions.findAllProperty(data));
    dispatch(
      vendorGoodsSpecActions.findAllByProductId({
        vendorId: user.vendorId,
        ...data,
      })
    );
  };

  useEffect(() => {
    let category: { [key: string]: any }[] = [];
    if (checkStatus(categoryList.status)) {
      categoryList.data.category1sts.map((list1st: any) => {
        category.push({
          id: list1st.category1st.id,
          description: list1st.category1st.info.description,
          checked: false,
          category2nd: list1st.category2nds.map((list2nd: any) => {
            return {
              category1stId: list2nd.category2nd.info.ownerId,
              id: list2nd.category2nd.id,
              description: list2nd.category2nd.info.description,
              checked: false,
              category3rd: list2nd.category3rds.map((list3rd: any) => {
                return {
                  category2ndId: list3rd.category3rd.info.ownerId,
                  id: list3rd.category3rd.id,
                  description: list3rd.category3rd.info.description,
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
    if (checkStatus(groupRegister.status)) {
      dispatch(vendorGoodsGroupActions.reset("register"));
      setModalVisible(true);
    }
  }, [groupRegister]);

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.reset("register"));
    dispatch(vendorProductActions.findAll(false));
    dispatch(vendorProductActions.reset("findAllCategory"));
    dispatch(vendorProductActions.reset("findManufacturerByProductId"));
    return () => {
      dispatch(vendorGoodsGroupActions.reset("register"));
      dispatch(vendorProductActions.reset("findAll"));
      dispatch(vendorProductActions.reset("findAllCategory"));
      dispatch(vendorProductActions.reset("findManufacturerByProductId"));
    };
  }, []);

  return (
    <GoodsGroupRregister
      user={user}
      productList={productList}
      propertyList={propertyList}
      categoryList={newCategory}
      manufacturerList={manufacturerList}
      goodsSpecList={goodsSpecList}
      groupRegister={groupRegister}
      setNewCategory={setNewCategory}
      onSubmit={onSubmit}
      onSelectProduct={onSelectProduct}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default GoodsGroupRegisterContainer;
