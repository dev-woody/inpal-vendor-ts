import BeforeDelivery from "components/order/beforeDelivery/beforeDelivery";
import { ColumnsType } from "lib/columns/columnsList";
import {
  changeDays,
  changeDeliveryStatus,
  changePhone,
} from "lib/functions/changeInput";
import { Button, StyledSelect } from "lib/styles";
import { CheckBox } from "lib/styles/checkBoxStyled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { testVendorOrderData } from "types/data.test";

const BeforeDeliveryContainer = () => {
  const { user, orderList } = useAppSelector((store) => ({
    user: store.user,
    orderList: store.vendorOrder.findByDelivery,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      vendorOrderActions.findByDelivery({
        vendorId: user.vendorId,
        isDesc: false,
      })
    );
  }, []);

  //* beforedelivery
  const beforedeliveryColumns: ColumnsType[] = [
    {
      title: "구매자명",
      dataIndex: "info",
      render: (info) => info.clientInfo.clientName,
    },
    {
      title: "주문자명",
      dataIndex: "info",
      render: (info) => info.address.info.application,
    },
    {
      title: "주문자 연락처",
      dataIndex: "info",
      render: (info) => info.address.info.mobile,
    },
    {
      title: "택배사",
      dataIndex: "info",
      render: (info) =>
        info?.deliveryCompany ? info?.deliveryCompany : "배송처리 전 상품",
    },
    {
      title: "송장번호",
      dataIndex: "info",
      render: (info) =>
        info?.deliveryNum ? info?.deliveryNum : "배송처리 전 상품",
    },
    {
      title: "주문상품",
      dataIndex: "info",
      render: (info) =>
        info.orderItems[0]?.info?.item?.info?.basic?.info?.name +
        ` 외 ${info.orderItems.length - 1}개`,
    },
  ];

  return (
    <BeforeDelivery
      beforeDelivery={orderList}
      beforedeliveryColumns={beforedeliveryColumns}
    />
  );
};

export default BeforeDeliveryContainer;
