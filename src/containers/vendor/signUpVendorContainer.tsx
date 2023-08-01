import SignUp from "components/vendor/signUp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const SignUpVendorContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { addResult, user } = useAppSelector((store) => ({
    user: store.user,
    addResult: store.vendorAdmin.register,
  }));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: object) => {
    dispatch(vendorAdminActions.register({ vendorId: user.vendorId, ...data }));
  };

  useEffect(() => {
    if (checkStatus(addResult.status)) {
      setModalVisible(true);
      dispatch(vendorAdminActions.reset("signUp"));
    }
  }, [addResult, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(vendorAdminActions.reset("findAll"));
    };
  }, []);

  return (
    <SignUp
      user={user}
      addResult={addResult}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default SignUpVendorContainer;
