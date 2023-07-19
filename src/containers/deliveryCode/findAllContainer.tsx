import DeliveryCodeList from "components/deliveryCode/deliveryCodeList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deliveryFindAllActions } from "reducers/deliveryCode/findAll";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const DeliveryFindAllContainer = () => {
  const { user, productList } = useAppSelector((state) => ({
    user: state.user,
    productList: state.deliveryFindAll.data,
  }));
  const arrayProductList = productList?.reduce(function (
    acc: object[],
    cur: object
  ) {
    return acc.concat(cur);
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      deliveryFindAllActions.getFindAll({
        data: { vendorId: user.vendorId, isDesc: true },
      })
    );
    return () => {
      dispatch(deliveryFindAllActions.reset({}));
    };
  }, [dispatch]);

  return <DeliveryCodeList productList={arrayProductList} />;
};

export default DeliveryFindAllContainer;
