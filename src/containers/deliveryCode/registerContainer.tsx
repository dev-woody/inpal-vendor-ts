import DcodeRegister from "components/deliveryCode/register";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deliveryRegisterActions } from "reducers/deliveryCode/register";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const DeliveryRegisterContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { productList, register, user } = useAppSelector((state) => ({
    productList: state.vendorProduct.findAll,
    register: state.deliveryRegister,
    user: state.user,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = ({ data }: { data: any }) => {
    const newData = { ...data, vendorId: user.vendorId };
    dispatch(deliveryRegisterActions.postRegister({ data: newData }));
    console.log(newData);
  };

  useEffect(() => {
    if (register.success) {
      setModalVisible(true);
      dispatch(deliveryRegisterActions.reset({}));
    }
  }, [register]);

  useEffect(() => {
    dispatch(vendorProductActions.findAll({}));
    return () => {
      dispatch(deliveryRegisterActions.reset({}));
      dispatch(vendorProductActions.reset("findAll"));
    };
  }, [dispatch]);

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
