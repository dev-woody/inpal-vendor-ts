import RegistrationInfo from "components/vendor/registrationInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vendorAdmin, { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const RegistrationInfoContainer = ({
  registrationInfo,
}: {
  registrationInfo: any;
}) => {
  const { user, registrationInfoUpdate } = useAppSelector((store) => ({
    user: store.user,
    registrationInfoUpdate: store.vendorAdmin.registrationInfo,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: object) => {
    dispatch(
      vendorAdminActions.registrationInfo({
        vendorId: user.vendorId,
        bizInfo: { registratonInfo: { ...data } },
      })
    );
  };

  useEffect(() => {
    if (checkStatus(registrationInfoUpdate.status)) {
      setModalVisible(true);
      dispatch(vendorAdminActions.reset("registrationInfoUpdate"));
    }
  }, [registrationInfoUpdate]);

  return (
    <RegistrationInfo
      registrationInfoUpdate={registrationInfoUpdate}
      registrationInfo={registrationInfo}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default RegistrationInfoContainer;
