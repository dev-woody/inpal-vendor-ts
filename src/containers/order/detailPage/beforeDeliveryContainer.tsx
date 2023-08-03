import BeforeDeliveryDetail from "components/order/beforeDelivery/beforeDeliveryDetail";
import {
  changeDays,
  changeDeliveryStatus,
  changePhone,
} from "lib/functions/changeInput";
import { StyledSelect } from "lib/styles";
import { CheckBox } from "lib/styles/checkBoxStyled";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorOrderActions } from "reducers/order/vendorOrder";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const BeforeDeliveryDetailContainer = () => {
  const { user, orderInfo, setStatus } = useAppSelector((store) => ({
    user: store.user,
    orderInfo: store.vendorOrder.deliveryFindById,
    setStatus: store.vendorOrder.setStatus,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const onSubmit = (data: object) => {
    dispatch(
      vendorOrderActions.setStatus({
        url: "setOrderByDeliveryDeliveryStart",
        clientId: orderInfo.data.info.clientInfo.clientId,
        orderByVendorId: orderInfo.data.info.orderByVendorId,
        orderByDeliveryId: orderInfo.data.base.id,
        orderStatus: "DELIVERY_START",
        ...data,
      })
    );
  };

  useEffect(() => {
    if (checkStatus(setStatus.status)) {
      setModalVisible(true);
      dispatch(vendorOrderActions.reset("setStatus"));
    }
  }, [dispatch, setStatus]);

  useEffect(() => {
    dispatch(
      vendorOrderActions.deliveryFindById({
        vendorId: user.vendorId,
        id,
      })
    );
  }, []);

  return (
    <BeforeDeliveryDetail
      orderDetail={orderInfo}
      setStatusResult={setStatus}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default BeforeDeliveryDetailContainer;
