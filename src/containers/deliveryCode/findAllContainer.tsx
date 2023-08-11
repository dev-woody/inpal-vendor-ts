import DeliveryCodeList from "components/deliveryCode/deliveryCodeList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const DeliveryFindAllContainer = () => {
  const { user, deliveryCodeList, productList } = useAppSelector((state) => ({
    user: state.user,
    deliveryCodeList: state.vendorDeliveryCode.findAllByProductId,
    productList: state.vendorProduct.findAll.data,
  }));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelect = (id: string) => {
    dispatch(
      vendorDeliveryCodeActions.findAllByProductId({
        vendorId: user.vendorId,
        productId: id,
        isDesc: true,
      })
    );
  };

  useEffect(() => {
    dispatch(dispatch(vendorProductActions.findAll(false)));
    return () => {
      dispatch(vendorDeliveryCodeActions.reset("findAll"));
    };
  }, []);

  return (
    <DeliveryCodeList
      deliveryCodeList={deliveryCodeList.data}
      productList={productList}
      onSelect={onSelect}
    />
  );
};

export default DeliveryFindAllContainer;
