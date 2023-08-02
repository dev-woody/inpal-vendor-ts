import BeforePayment from "components/order/beforePayment/beforePayment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import {
  changeDays,
  changeDeliveryStatus,
  changePhone,
} from "lib/functions/changeInput";
import { Button, StyledSelect } from "lib/styles";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { ColumnsType } from "lib/columns/columnsList";
import { testVendorOrderData } from "types/data.test";
import { CheckBox } from "lib/styles/checkBoxStyled";
import { vendorOrderActions } from "reducers/order/vendorOrder";

const BeforePaymentContainer = () => {
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

  //* beforePayment
  const beforePaymentColumns: ColumnsType[] = [
    {
      title: "구매자명",
      dataIndex: "info",
      render: (info) => info.clientInfo.clientName,
    },
    {
      title: "주문자명",
      dataIndex: "info",
      render: (info) => info.item.address.info.application,
    },
    {
      title: "주문자 연락처",
      dataIndex: "info",
      render: (info) => info.item.address.info.mobile,
    },
    {
      title: "모델명",
      dataIndex: "info",
      render: (info) => info.item.info.basic.info.model,
    },
    {
      title: "상품명",
      dataIndex: "info",
      render: (info) => info.item.info.basic.info.name,
    },
    {
      title: "주문수량",
      dataIndex: "info",
      render: (info) => info.count + "개",
    },
    {
      title: "주문금액",
      dataIndex: "info",
      render: (info) => info.payTotal + "원",
    },
    {
      title: "주문상태",
      dataIndex: "info",
      render: (info) => {
        return (
          <Button
            onClick={() =>
              dispatch(
                vendorOrderActions.setStatus({
                  url: "setOrderItemReady",
                  // client,
                })
              )
            }
          >
            배송처리
          </Button>
        );
      },
    },
  ];

  return (
    <BeforePayment
      beforePayment={orderList}
      beforePaymentColumns={beforePaymentColumns}
    />
  );
};

export default BeforePaymentContainer;
