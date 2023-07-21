import SpecRegister from "components/goodsGroup/spec/specRegister";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const SpecRegisterContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { user, productList, deliveryCode, unitCode } = useAppSelector(
    (state) => ({
      user: state.user,
      productList: state.vendorProduct.findAll,
      deliveryCode: state.vendorDeliveryCode.findAllByProductId,
      unitCode: state.vendorProduct.findUnitByProductId,
    })
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelectProduct = (id: string) => {
    dispatch(
      vendorProductActions.findUnitByProductId({ productId: id, isDesc: false })
    );
    dispatch(
      vendorDeliveryCodeActions.findAllByProductId({
        vendorId: user.vendorId,
        productId: id,
        isDesc: false,
      })
    );
  };

  const onSubmit = (data: object) => {
    dispatch(
      vendorGoodsSpecActions.register({ vendorId: user.vendorId, ...data })
    );
  };

  useEffect(() => {
    dispatch(vendorProductActions.findAll(false));
  }, []);

  return (
    <SpecRegister
      productList={productList}
      deliveryCode={deliveryCode}
      unitCode={unitCode}
      onSelectProduct={onSelectProduct}
      onSubmit={onSubmit}
      navigate={navigate}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default SpecRegisterContainer;
