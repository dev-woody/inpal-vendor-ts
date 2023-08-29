import BeforeDelivery from "components/order/beforeDelivery/beforeDelivery";
import { ColumnsType } from "lib/columns/columnsList";
import { changePhone } from "lib/functions/changeInput";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const BeforeDeliveryContainer = () => {
  const { user, orderList, countOrder } = useAppSelector((store) => ({
    user: store.user,
    orderList: store.vendorOrder.pageDeliveryStatus,
    countOrder: store.vendorOrder.countDeliveryStatus,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelect = (status: string) => {
    setSearchParams({
      n: btoa("0"),
      d: searchParams.get("d") || btoa("false"),
      s: btoa(status),
    });
  };

  // useEffect(() => {
  //   dispatch(
  //     vendorOrderActions.countDeliveryStatus({
  //       vendorId: user.vendorId,
  //       deliveryStatus: atob(searchParams.get("s") || btoa("all")),
  //     })
  //   );
  // }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "deliveryPageInfo",
      JSON.stringify({
        n: searchParams.get("n"),
        d: searchParams.get("d"),
        s: searchParams.get("s"),
      })
    );
    dispatch(
      vendorOrderActions.countDeliveryStatus({
        vendorId: user.vendorId,
        deliveryStatus: atob(searchParams.get("s") || btoa("all")),
      })
    );
    dispatch(
      vendorOrderActions.pageDeliveryStatus({
        vendorId: user.vendorId,
        page: atob(searchParams.get("n") || btoa("0")),
        isDesc: atob(searchParams.get("d") || btoa("false")),
        deliveryStatus: atob(searchParams.get("s") || btoa("all")),
        size: 10,
      })
    );
  }, [searchParams.get("n"), searchParams.get("d"), searchParams.get("s")]);

  useEffect(() => {
    if (
      (searchParams.get("n") ||
        searchParams.get("d") ||
        searchParams.get("s")) === null
    )
      navigate(`?n=${btoa("0")}&d=${btoa("false")}&s=${btoa("all")}`);
  }, [searchParams.get("n"), searchParams.get("d"), searchParams.get("s")]);

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
      render: (info) => changePhone(info.address.info.mobile),
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
      onSelect={onSelect}
    />
  );
};

export default BeforeDeliveryContainer;
