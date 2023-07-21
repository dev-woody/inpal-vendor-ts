import SpecDetail from "components/goodsGroup/spec/specDetail";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const SpecDetailContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { user, specDetail, deliveryCode, unitCode } = useAppSelector(
    (state) => ({
      user: state.user,
      specDetail: state.vendorGoodsSpec.findById,
      deliveryCode: state.vendorDeliveryCode.findAllByProductId,
      unitCode: state.vendorProduct.findUnitByProductId,
    })
  );
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

  // useEffect(() => )

  useEffect(() => {
    if (specDetail.success) {
      dispatch(
        vendorProductActions.findUnitByProductId({
          productId: specDetail.data.info.delivery.productId,
          isDesc: false,
        })
      );
      dispatch(
        vendorDeliveryCodeActions.findAllByProductId({
          vendorId: user.vendorId,
          productId: specDetail.data.info.delivery.productId,
          isDesc: false,
        })
      );
    }
  }, [specDetail]);

  return (
    <SpecDetail
      specDetail={specDetail}
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
