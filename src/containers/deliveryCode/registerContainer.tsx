import DcodeRegister from "components/deliveryCode/register";
import { useEffect, useState } from "react";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const DeliveryRegisterContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { productList, register, user } = useAppSelector((state) => ({
    productList: state.vendorProduct.findAll,
    register: state.vendorDeliveryCode.register,
    user: state.user,
  }));
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    const newData = { ...data, vendorId: user.vendorId };
    dispatch(vendorDeliveryCodeActions.register(newData));
    console.log(newData);
  };

  useEffect(() => {
    if (register.success) {
      setModalVisible(true);
      dispatch(vendorDeliveryCodeActions.reset("register"));
    }
  }, [register]);

  useEffect(() => {
    dispatch(vendorProductActions.findAll(false));
    return () => {
      dispatch(vendorDeliveryCodeActions.reset("register"));
      dispatch(vendorProductActions.reset("findAll"));
    };
  }, []);

  return (
    <DcodeRegister
      productList={productList.data}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default DeliveryRegisterContainer;
