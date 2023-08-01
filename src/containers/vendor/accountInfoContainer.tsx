import AccountInfo from "components/vendor/accountInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vendorAdmin, { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const AccountInfoContainer = ({ accountInfo }: { accountInfo: any }) => {
  const { user, accountInfoUpdate } = useAppSelector((store) => ({
    user: store.user,
    accountInfoUpdate: store.vendorAdmin.accountInfo,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: object) => {
    dispatch(
      vendorAdminActions.accountInfo({
        vendorId: user.vendorId,
        bizInfo: { accountInfo: { ...data } },
      })
    );
  };

  useEffect(() => {
    if (checkStatus(accountInfoUpdate.status)) {
      setModalVisible(true);
      dispatch(vendorAdminActions.reset("accountInfoUpdate"));
    }
  }, [accountInfoUpdate]);

  return (
    <AccountInfo
      accountInfoUpdate={accountInfoUpdate}
      accountInfo={accountInfo}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default AccountInfoContainer;
