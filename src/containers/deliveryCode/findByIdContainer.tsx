import DeliveryDetail from "components/deliveryCode/deliveryDetail";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const DeliveryDetailContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { user, dcode, productId, update } = useAppSelector((state) => ({
    user: state.user,
    dcode: state.vendorDeliveryCode.findById,
    update: state.vendorDeliveryCode.update,
    productId: state.vendorProduct.findById,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = (data: any) => {
    const updateData = {
      id,
      vendorId: dcode.data?.info?.vendorId,
      productId: dcode.data?.info?.productId,
      basicFee: Number(data.basicFee),
      freeCondition: Number(data.freeCondition),
    };
    dispatch(vendorDeliveryCodeActions.update(updateData));
  };

  useEffect(() => {
    if (update.success) {
      setModalVisible(true);
      dispatch(vendorDeliveryCodeActions.findById(id));
      dispatch(vendorDeliveryCodeActions.reset("update"));
    }
  }, [dispatch, update]);

  useEffect(() => {
    if (dcode.success) {
      dispatch(vendorProductActions.findById(dcode.data.info.productId));
    }
  }, [dcode]);

  useEffect(() => {
    dispatch(
      vendorDeliveryCodeActions.findById({
        vendorId: user.vendorId,
        id,
      })
    );
    return () => {
      dispatch(vendorDeliveryCodeActions.reset("findById"));
      dispatch(vendorDeliveryCodeActions.reset("update"));
      dispatch(vendorProductActions.reset("findById"));
    };
  }, []);

  return (
    <DeliveryDetail
      update={update.success}
      dcode={dcode.data}
      productId={productId}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default DeliveryDetailContainer;
