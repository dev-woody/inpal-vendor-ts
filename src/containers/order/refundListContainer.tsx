import RefundList from "components/order/refund/refundList";
import { ColumnsType } from "lib/columns/columnsList";
import { Button } from "lib/styles";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const RefundListContainer = () => {
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
        orderStatus: "refund_request",
      })
    );
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "orderPageInfo",
      JSON.stringify({
        n: searchParams.get("p"),
        d: searchParams.get("d"),
      })
    );
    dispatch(
      vendorOrderActions.pageOrderStatus({
        vendorId: user.vendorId,
        orderStatus: "refund_request",
        page: atob(searchParams.get("n") || btoa("0")),
        isDesc: atob(searchParams.get("d") || btoa("false")),
        size: 10,
      })
    );
  }, [searchParams.get("n"), searchParams.get("d")]);

  useEffect(() => {
    navigate(`?n=${btoa("0")}&d=${btoa("false")}`);
  }, []);

  //* refund
  const refundOrderColumns: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "코드",
      dataIndex: "info",
      render: (info) => info.code,
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
    <RefundList
      refundList={orderList}
      countOrder={countOrder}
      refundOrderColumns={refundOrderColumns}
    />
  );
};

export default RefundListContainer;
