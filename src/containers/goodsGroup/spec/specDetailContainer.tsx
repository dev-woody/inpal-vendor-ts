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
    useAppSelector((store) => ({
      user: store.user,
      specDetail: store.vendorGoodsSpec.findById,
      deliveryCode: store.vendorDeliveryCode.findAllByProductId,
      unitCode: store.vendorProduct.findUnitByProductId,
      specUpdate: store.vendorGoodsSpec.update,
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
    // return () => {
    //   dispatch(vendorGoodsSpecActions.reset("findById"));
    // };
  }, []);

  useEffect(() => {
    if (checkStatus(specUpdate.statsu)) {
      setModalVisible(true);
      dispatch(vendorGoodsSpecActions.reset("update"));
      dispatch(
        vendorGoodsSpecActions.findById({ vendorId: user.vendorId, id })
      );
    }
  }, [specUpdate]);

  useEffect(() => {
    if (checkStatus(specDetail.status)) {
      dispatch(
        vendorProductActions.findUnitByProductId({
          productId: specDetail?.data?.info?.delivery?.info?.productId,
          isDesc: false,
        })
      );
      dispatch(
        vendorDeliveryCodeActions.findAllByProductId({
          vendorId: user.vendorId,
          productId: specDetail?.data?.info?.delivery?.info?.productId,
          isDesc: false,
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
