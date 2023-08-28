import BeforeDelivery from "components/order/beforeDelivery/beforeDelivery";
import { ColumnsType } from "lib/columns/columnsList";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const BeforeDeliveryContainer = () => {
  const { user, orderList, countOrder } = useAppSelector((store) => ({
    user: store.user,
    orderList: store.vendorOrder.pageDelivery,
    countOrder: store.vendorOrder.countDelivery,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(vendorOrderActions.countDelivery(user.vendorId));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "deliveryPageInfo",
      JSON.stringify({
        pageNum: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
      })
    );
    dispatch(
      vendorOrderActions.pageDelivery({
        vendorId: user.vendorId,
        page: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
        size: 10,
      })
    );
  }, [searchParams.get("pageNum"), searchParams.get("isDesc")]);

  useEffect(() => {
    navigate(`?pageNum=0&isDesc=false`);
  }, []);

  //* beforedelivery
  const beforedeliveryColumns: ColumnsType[] = [
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
      countOrder={countOrder}
      beforedeliveryColumns={beforedeliveryColumns}
    />
  );
};

export default BeforeDeliveryContainer;
