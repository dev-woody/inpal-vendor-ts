import ServiceInfo from "components/vendor/serviceInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vendorAdmin, { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const ServiceInfoContainer = ({ serviceInfo }: { serviceInfo: any }) => {
  const { user, serviceInfoUpdate } = useAppSelector((store) => ({
    user: store.user,
    serviceInfoUpdate: store.vendorAdmin.serviceInfo,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: object) => {
    dispatch(
      vendorAdminActions.serviceInfo({
        vendorId: user.vendorId,
        bizInfo: { serviceInfo: { ...data } },
      })
    );
  };

  useEffect(() => {
    if (checkStatus(serviceInfoUpdate.status)) {
      setModalVisible(true);
      dispatch(vendorAdminActions.reset("serviceInfoUpdate"));
    }
  }, [serviceInfoUpdate]);

  return (
    <ServiceInfo
      serviceInfoUpdate={serviceInfoUpdate}
      serviceInfo={serviceInfo}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default ServiceInfoContainer;
