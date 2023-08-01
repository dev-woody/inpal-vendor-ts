import BasicInfo from "components/vendor/basicInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vendorAdmin, { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const BasicInfoContainer = ({ basicInfo }: { basicInfo: any }) => {
  const { user, basicInfoUpdate } = useAppSelector((store) => ({
    user: store.user,
    basicInfoUpdate: store.vendorAdmin.basicInfo,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: object) => {
    dispatch(
      vendorAdminActions.basicInfo({
        vendorId: user.vendorId,
        bizInfo: { basicInfo: { ...data } },
      })
    );
  };

  useEffect(() => {
    if (checkStatus(basicInfoUpdate.status)) {
      setModalVisible(true);
      dispatch(vendorAdminActions.reset("basicInfoUpdate"));
    }
  }, [basicInfoUpdate]);

  return (
    <BasicInfo
      basicInfoUpdate={basicInfoUpdate}
      basicInfo={basicInfo}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default BasicInfoContainer;
