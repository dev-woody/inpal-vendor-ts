import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { useParams } from "react-router-dom";
import { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { changePostPhone } from "lib/functions/changeInput";
import { DataObj, checkStatus } from "types/globalTypes";
import VendorDetail from "components/vendor/detail";

const VendorDetailContainer = () => {
  const { user, master } = useAppSelector((store) => ({
    user: store.user,
    master: store.vendorAdmin.findByUserId,
  }));
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(
      vendorAdminActions.findByUserId({ vendorId: user.vendorId, userId })
    );
    return () => {
      dispatch(vendorAdminActions.reset("findByUserId"));
    };
  }, []);

  return <VendorDetail user={user} master={master} />;
};

export default VendorDetailContainer;
