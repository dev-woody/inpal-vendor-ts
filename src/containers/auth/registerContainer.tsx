import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { userActions } from "reducers/user";
import { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { vendorProductActions } from "reducers/product/vendorProduct";
import RegisterForm from "components/auth/registerForm";
import { checkStatus } from "types/globalTypes";

function RegisterContainer() {
  const { productList, isRegister } = useAppSelector((state) => ({
    productList: state.vendorProduct.findAll,
    isRegister: state.vendorAdmin.signUp,
  }));

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(vendorAdminActions.signUp(data));
  };

  useEffect(() => {
    dispatch(vendorProductActions.findAll(false));
    dispatch(vendorAdminActions.reset("signUp"));
    return () => {
      dispatch(vendorProductActions.reset("findAll"));
      dispatch(vendorAdminActions.reset("signUp"));
    };
  }, []);

  useEffect(() => {
    if (checkStatus(isRegister.status)) {
      setModalVisible(true);
      dispatch(vendorAdminActions.reset("signUp"));
    }
  }, [isRegister]);

  return (
    <RegisterForm
      productList={productList.data}
      isRegister={isRegister}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
}

export default RegisterContainer;
