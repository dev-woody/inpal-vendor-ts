import DeliveryDetail from "components/deliveryCode/deliveryDetail";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deliveryFindByIdActions } from "reducers/deliveryCode/findById";
import { deliveryUpdateActions } from "reducers/deliveryCode/update";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const DeliveryDetailContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { dcode, productId, update } = useAppSelector((state) => ({
    dcode: state.deliveryFindById,
    productId: state.vendorProduct.findAllByProductId,
    update: state.deliveryUpdate,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = ({ data }: { data: any }) => {
    const updateData = {
      id,
      vendorId: dcode.data?.vendorId,
      productId: dcode.data?.productId,
      basicFee: Number(data.basicFee),
      freeCondition: Number(data.freeCondition),
    };
    dispatch(deliveryUpdateActions.postUpdate({ data: updateData }));
  };

  useEffect(() => {
    if (update.success) {
      setModalVisible(true);
      dispatch(deliveryFindByIdActions.getFindById({ id }));
      dispatch(deliveryUpdateActions.reset({}));
    }
  }, [dispatch, update]);

  useEffect(() => {
    if (dcode.success) {
      dispatch(
        vendorProductActions.findAllByProductId({ id: dcode.data.productId })
      );
    }
  }, [dcode]);

  useEffect(() => {
    dispatch(vendorProductActions.findAllByProductId({ id }));
    return () => {
      dispatch(deliveryFindByIdActions.reset({}));
      dispatch(deliveryUpdateActions.reset({}));
      dispatch(vendorProductActions.reset("findAllByProductId"));
    };
  }, [dispatch]);

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
