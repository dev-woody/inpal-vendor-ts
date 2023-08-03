import PaymentCompleteList from "components/order/paymentComplete/paymentCompleteList";
import { ColumnsType } from "lib/columns/columnsList";
import {
  changeDays,
  changeDeliveryStatus,
  changePhone,
} from "lib/functions/changeInput";
import { Button } from "lib/styles";
import { CheckBox } from "lib/styles/checkBoxStyled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const PaymentCompleteContainer = () => {
  const { user, orderList, setStatus } = useAppSelector((store) => ({
    user: store.user,
    orderList: store.vendorOrder.itemFindAll,
    setStatus: store.vendorOrder.setStatus,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkStatus(setStatus.status)) {
      setModalVisible(true);
      dispatch(vendorOrderActions.reset("setStatus"));
      dispatch(
        vendorOrderActions.itemFindAll({
          vendorId: user.vendorId,
          isDesc: false,
        })
      );
    }
  }, [dispatch, setStatus]);

  useEffect(() => {
    dispatch(
      vendorOrderActions.itemFindAll({
        vendorId: user.vendorId,
        isDesc: false,
      })
    );
  }, []);

  //* paymentComplete
  const paymentCompleteOrderColumns: ColumnsType[] = [
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
            배송처리
          </Button>
        );
      },
    },
  ];

  return (
    <PaymentCompleteList
      paymentComplete={orderList}
      paymentCompleteOrderColumns={paymentCompleteOrderColumns}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default PaymentCompleteContainer;
