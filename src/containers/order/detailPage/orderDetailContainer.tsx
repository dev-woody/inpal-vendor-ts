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
import { checkStatus } from "types/globalTypes";

const OrderDetailContainer = () => {
  const { user, orderInfo, orderLog } = useAppSelector((store) => ({
    user: store.user,
    orderInfo: store.vendorOrder.itemFindById,
    orderLog: store.vendorOrder.orderLog,
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
    return () => {
      dispatch(vendorOrderActions.reset("itemFindById"));
    };
  }, []);

  useEffect(() => {
    if (checkStatus(orderInfo.status)) {
      dispatch(
        vendorOrderActions.orderLog({
          vendorId: user.vendorId,
          orderItemId: orderInfo.data.base.id,
          isDesc: true,
        })
      );
    }
  }, [orderInfo]);

  return (
    <OrderDetail
      orderInfo={orderInfo}
      orderLog={orderLog}
      navigate={navigate}
    />
  );
};

export default OrderDetailContainer;
