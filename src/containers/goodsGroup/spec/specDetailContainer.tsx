import SpecDetail from "components/goodsGroup/spec/specDetail";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const SpecDetailContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { user, specDetail, deliveryCode, unitCode, specUpdate } =
    useAppSelector((state) => ({
      user: state.user,
      specDetail: state.vendorGoodsSpec.findById,
      deliveryCode: state.vendorDeliveryCode.findAllByProductId,
      unitCode: state.vendorProduct.findUnitByProductId,
      specUpdate: state.vendorGoodsSpec.update,
    }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const onSubmit = (data: any) => {
    dispatch(
      vendorGoodsSpecActions.update({ vendorId: user.vendorId, id, ...data })
    );
  };

  useEffect(() => {
    dispatch(vendorGoodsSpecActions.findById({ vendorId: user.vendorId, id }));
  }, []);

  useEffect(() => {
    if (checkStatus(specUpdate.statsu)) {
      setModalVisible(true);
      dispatch(vendorGoodsSpecActions.reset("update"));
    }
  }, [specUpdate]);

  useEffect(() => {
    if (specDetail.success) {
      dispatch(
        vendorProductActions.findUnitByProductId({
          productId: specDetail.data.info.delivery.productId,
          isDesc: true,
        })
      );
      dispatch(
        vendorDeliveryCodeActions.findAllByProductId({
          vendorId: user.vendorId,
          productId: specDetail.data.info.delivery.productId,
          isDesc: true,
        })
      );
    }
  }, [specDetail]);

  return (
    <SpecDetail
      specDetail={specDetail}
      specUpdate={specUpdate}
      deliveryCode={deliveryCode}
      unitCode={unitCode}
      onSubmit={onSubmit}
      navigate={navigate}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default SpecDetailContainer;
