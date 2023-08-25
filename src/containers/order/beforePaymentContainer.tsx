import BeforePayment from "components/order/beforePayment/beforePayment";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { Button } from "lib/styles";
import { ColumnsType } from "lib/columns/columnsList";
import { vendorOrderActions } from "reducers/order/vendorOrder";

const BeforePaymentContainer = () => {
  const { user, orderList, countOrder } = useAppSelector((store) => ({
    user: store.user,
    orderList: store.vendorOrder.pageOrderStatus,
    countOrder: store.vendorOrder.countOrderStatus,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(
      vendorOrderActions.countOrderStatus({
        vendorId: user.vendorId,
        orderStatus: "payment_wait",
      })
    );
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "orderPageInfo",
      JSON.stringify({
        pageNum: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
      })
    );
    dispatch(
      vendorOrderActions.pageOrderStatus({
        vendorId: user.vendorId,
        orderStatus: "payment_wait",
        page: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
        size: 10,
      })
    );
  }, [searchParams.get("pageNum"), searchParams.get("isDesc")]);

  useEffect(() => {
    navigate(`?pageNum=0&isDesc=false`);
  }, []);

  //* beforePayment
  const beforePaymentColumns: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
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
      countOrder={countOrder}
      beforePaymentColumns={beforePaymentColumns}
    />
  );
};

export default BeforePaymentContainer;
