import AddressInfo from "components/vendor/addressInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vendorAdmin, { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const AddressInfoContainer = ({ addressInfo }: { addressInfo: any }) => {
  const { user, addressInfoUpdate } = useAppSelector((store) => ({
    user: store.user,
    addressInfoUpdate: store.vendorAdmin.addressInfo,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: object) => {
    dispatch(
      vendorAdminActions.addressInfo({
        vendorId: user.vendorId,
        bizInfo: { addressInfo: { ...data } },
      })
    );
  };

  useEffect(() => {
    if (checkStatus(addressInfoUpdate.status)) {
      setModalVisible(true);
      dispatch(vendorAdminActions.reset("addressInfoUpdate"));
    }
  }, [addressInfoUpdate]);

  return (
    <AddressInfo
      addressInfoUpdate={addressInfoUpdate}
      addressInfo={addressInfo}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default AddressInfoContainer;
