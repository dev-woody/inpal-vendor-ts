import BasicInfoUpdate from "components/goodsGroup/basicInfoUpdate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const BasicInfoUpdateContainer = ({ basicInfo }: { basicInfo: any }) => {
  const {
    user,
    goodsGroupInfo,
    productList,
    propertyList,
    categoryList,
    manufacturerList,
  } = useAppSelector((store) => ({
    user: store.user,
    goodsGroupInfo: store.vendorGoodsGroup.findById,
    productList: store.vendorProduct.findAll,
    propertyList: store.vendorProduct.findAllProperty,
    categoryList: store.vendorProduct.findAllCategory,
    manufacturerList: store.vendorProduct.findManufacturerByProductId,
  }));

  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(
      vendorGoodsGroupActions.basicUpdate({ vendorId: user.vendorId, ...data })
    );
  };

  useEffect(() => {
    if (goodsGroupInfo.success) {
      const data = {
        productId: goodsGroupInfo.data.info.basic.info.product.id,
        isDesc: false,
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
    }
  }, [goodsGroupInfo]);

  return (
    <BasicInfoUpdate
      basicInfo={basicInfo}
      productList={productList}
      propertyList={propertyList}
      // categoryList={newCategory}
      manufacturerList={manufacturerList}
      onSubmit={onSubmit}
    />
  );
};

export default BasicInfoUpdateContainer;
