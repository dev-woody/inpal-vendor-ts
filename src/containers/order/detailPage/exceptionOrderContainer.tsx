import OrderException from "components/order/allList/orderException";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

type ExceptionType = {
  url: string;
  nextStatus: string;
};

const OrderExceptionContainer = ({ url, nextStatus }: ExceptionType) => {
  const { user, orderInfo, setStatus, orderLog } = useAppSelector((store) => ({
    user: store.user,
    orderInfo: store.vendorOrder.itemFindById,
    setStatus: store.vendorOrder.setStatus,
    orderLog: store.vendorOrder.orderLog,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const onSubmit = (data: object) => {
    dispatch(
      vendorOrderActions.setStatus({
        url: url,
        orderItemId: orderInfo?.data?.base?.id,
        orderStatus: nextStatus,
        ...data,
      })
    );
  };

  useEffect(() => {
    if (checkStatus(setStatus.status)) {
      setModalVisible(true);
      dispatch(vendorOrderActions.reset("setStatus"));
      dispatch(
        vendorOrderActions.itemFindById({
          vendorId: user.vendorId,
          id,
        })
      );
    }
  }, [setStatus]);

  useEffect(() => {
    if (checkStatus(orderInfo.status)) {
      dispatch(
        vendorOrderActions.orderLog({
          vendorId: user.vendorId,
          orderItemId: orderInfo.data.base.id,
          isDesc: false,
        })
      );
    }
  }, [orderInfo]);

  useEffect(() => {
    dispatch(
      vendorOrderActions.itemFindById({
        vendorId: user.vendorId,
        id,
      })
    );
    return () => {
      dispatch(vendorOrderActions.reset("itemFindById"));
    };
  }, []);

  return (
    <OrderException
      orderInfo={orderInfo}
      setStatusResult={setStatus}
      orderLog={orderLog}
      navigate={navigate}
      nextStatus={nextStatus}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default OrderExceptionContainer;
