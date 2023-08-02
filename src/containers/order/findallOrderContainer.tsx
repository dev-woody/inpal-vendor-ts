import OrderList from "components/order/allList/orderList";
import {
  changeDays,
  changeDeliveryStatus,
  changePhone,
} from "lib/functions/changeInput";
import { StyledSelect } from "lib/styles";
import { CheckBox } from "lib/styles/checkBoxStyled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const OrderAllListContainer = () => {
  const { user, orderList } = useAppSelector((store) => ({
    user: store.user,
    orderList: store.vendorOrder.itemFindAll,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      vendorOrderActions.itemFindAll({
        vendorId: user.vendorId,
        isDesc: false,
      })
    );
  }, []);

  return <OrderList orderList={orderList} />;
};

export default OrderAllListContainer;
