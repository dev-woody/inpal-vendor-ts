import OrderDetail from "components/order/allList/orderDetail";
import OrderList from "components/order/allList/orderList";
import {
  changeDays,
  changeDeliveryStatus,
  changePhone,
} from "lib/functions/changeInput";
import { StyledSelect } from "lib/styles";
import { CheckBox } from "lib/styles/checkBoxStyled";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const OrderDetailContainer = () => {
  const { user, orderInfo } = useAppSelector((store) => ({
    user: store.user,
    orderInfo: store.vendorOrder.itemFindById,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(
      vendorOrderActions.itemFindById({
        vendorId: user.vendorId,
        id,
      })
    );
  }, []);

  return <OrderDetail orderInfo={orderInfo} />;
};

export default OrderDetailContainer;
