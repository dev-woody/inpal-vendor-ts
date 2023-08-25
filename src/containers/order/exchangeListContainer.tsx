import ExchangeList from "components/order/exchange/exchangeList";
import { ColumnsType } from "lib/columns/columnsList";
import { Button } from "lib/styles";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const ExchangeListContainer = () => {
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
        orderStatus: "exchange_request",
      })
    );
  }, []);

  useEffect(() => {
    navigate(`?pageNum=0&isDesc=false`);
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
        orderStatus: "exchange_request",
        page: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
        size: 10,
      })
    );
  }, [searchParams.get("pageNum"), searchParams.get("isDesc")]);

  useEffect(() => {
    dispatch(
      vendorOrderActions.itemFindAll({
        vendorId: user.vendorId,
        isDesc: false,
      })
    );
  }, []);

  //* exchange
  const exchangeOrderColumns: ColumnsType[] = [
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

  return <ExchangeList exchangeList={orderList} countOrder={countOrder} />;
};

export default ExchangeListContainer;
