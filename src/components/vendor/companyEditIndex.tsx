import styled from "styled-components";
import { Responsive } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import BasicInfoContainer from "containers/vendor/basicInfoContainer";
import RegistrationInfoContainer from "containers/vendor/registrationInfoContainer";
import AccountInfoContainer from "containers/vendor/accountInfoContainer";
import ServiceInfoContainer from "containers/vendor/serviceInfoContainer";
import AddressInfoContainer from "containers/vendor/addressInfoContainer";

const CompanyEditIndexBlock = styled(Responsive)``;

const CompanyEditIndex = ({ companyInfo }: { companyInfo: response }) => {
  const data = companyInfo?.data?.info?.bizInfo?.info;
  return (
    <>
      <CompanyEditIndexBlock></CompanyEditIndexBlock>
      <BasicInfoContainer basicInfo={data?.basic?.info} />
      <RegistrationInfoContainer registrationInfo={data?.registration?.info} />
      <AccountInfoContainer accountInfo={data?.account?.info} />
      <ServiceInfoContainer serviceInfo={data?.service?.info} />
      <AddressInfoContainer addressInfo={data?.address?.info} />
    </>
  );
};

export default CompanyEditIndex;
