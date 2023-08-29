import OrderList from "components/order/allList/orderList";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const OrderAllListContainer = () => {
  const { user, orderList, countOrder } = useAppSelector((store) => ({
    user: store.user,
    orderList: store.vendorOrder.pageOrder,
    countOrder: store.vendorOrder.countOrder,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(vendorOrderActions.countOrder(user.vendorId));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "orderPageInfo",
      JSON.stringify({
        n: searchParams.get("n"),
        d: searchParams.get("d"),
      })
    );
    dispatch(
      vendorOrderActions.pageOrder({
        vendorId: user.vendorId,
        page: atob(searchParams.get("n") || btoa("0")),
        isDesc: atob(searchParams.get("d") || btoa("false")),
        size: 10,
      })
    );
  }, [searchParams.get("n"), searchParams.get("d")]);

  useEffect(() => {
    navigate(`?n=${btoa("0")}&d=${btoa("false")}`);
  }, []);

  return <OrderList orderList={orderList} countOrder={countOrder} />;
};

export default OrderAllListContainer;
