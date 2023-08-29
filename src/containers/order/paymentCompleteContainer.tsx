import PaymentCompleteList from "components/order/paymentComplete/paymentCompleteList";
import { ColumnsType } from "lib/columns/columnsList";
import { changePhone, priceToString } from "lib/functions/changeInput";
import { Button } from "lib/styles";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const PaymentCompleteContainer = () => {
  const { user, orderList, countOrder, setStatus } = useAppSelector(
    (store) => ({
      user: store.user,
      orderList: store.vendorOrder.pageOrderStatus,
      countOrder: store.vendorOrder.countOrderStatus,
      setStatus: store.vendorOrder.setStatus,
    })
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (checkStatus(setStatus.status)) {
      setModalVisible(true);
      dispatch(vendorOrderActions.reset("setStatus"));
      dispatch(
        vendorOrderActions.pageOrderStatus({
          vendorId: user.vendorId,
          orderStatus: "payment_complete",
          page: searchParams.get("pageNum"),
          isDesc: searchParams.get("isDesc"),
          size: 10,
        })
      );
    }
  }, [dispatch, setStatus]);

  useEffect(() => {
    dispatch(
      vendorOrderActions.countOrderStatus({
        vendorId: user.vendorId,
        orderStatus: "payment_complete",
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
        orderStatus: "payment_complete",
        page: atob(searchParams.get("n") || btoa("0")),
        isDesc: atob(searchParams.get("d") || btoa("false")),
        size: 10,
      })
    );
  }, [searchParams.get("n"), searchParams.get("d")]);

  useEffect(() => {
    navigate(`?n=${btoa("0")}&d=${btoa("false")}`);
  }, []);

  //* paymentComplete
  const paymentCompleteOrderColumns: ColumnsType[] = [
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
      render: (info) => info.address.info.application,
    },
    {
      title: "주문자 연락처",
      dataIndex: "info",
      render: (info) => changePhone(info.address.info.mobile),
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
      render: (info) => priceToString(info.payTotal) + "원",
    },
    {
      title: "배송처리",
      dataIndex: "info",
      render: (info, itemInfo) => {
        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                vendorOrderActions.setStatus({
                  url: "setOrderItemReady",
                  orderItemIds: [itemInfo.base.id],
                })
              );
            }}
          >
            배송준비
          </Button>
        );
      },
    },
  ];

  return (
    <PaymentCompleteList
      paymentComplete={orderList}
      countOrder={countOrder}
      paymentCompleteOrderColumns={paymentCompleteOrderColumns}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default PaymentCompleteContainer;
