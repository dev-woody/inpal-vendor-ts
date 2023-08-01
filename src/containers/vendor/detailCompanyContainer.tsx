import CompanyEditIndex from "components/vendor/companyEditIndex";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const DetailCompanyContainer = () => {
  const { user, companyInfo } = useAppSelector((store) => ({
    user: store.user,
    companyInfo: store.vendorAdmin.findCompany,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(vendorAdminActions.findCompany(user.vendorId));
  }, []);

  return <CompanyEditIndex companyInfo={companyInfo} />;
};

export default DetailCompanyContainer;
