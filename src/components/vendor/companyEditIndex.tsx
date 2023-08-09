import styled from "styled-components";
import { BreadCrumb, Responsive } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import BasicInfoContainer from "containers/vendor/basicInfoContainer";
import RegistrationInfoContainer from "containers/vendor/registrationInfoContainer";
import AccountInfoContainer from "containers/vendor/accountInfoContainer";
import ServiceInfoContainer from "containers/vendor/serviceInfoContainer";
import AddressInfoContainer from "containers/vendor/addressInfoContainer";
import { useParams } from "react-router-dom";

const CompanyEditIndexBlock = styled(Responsive)``;

const CompanyEditIndex = ({ companyInfo }: { companyInfo: response }) => {
  const data = companyInfo?.data?.info?.bizInfo?.info;
  const { userId } = useParams();
  return (
    <>
      <CompanyEditIndexBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "마이페이지 /",
                  url: `/mypage/${userId}`,
                },
                {
                  name: "기업정보 수정",
                  url: `/vendor/${userId}/companyInfo`,
                },
              ]}
            />
          }
        />
      </CompanyEditIndexBlock>
      <BasicInfoContainer basicInfo={data?.basic?.info} />
      <RegistrationInfoContainer registrationInfo={data?.registration?.info} />
      <AccountInfoContainer accountInfo={data?.account?.info} />
      <ServiceInfoContainer serviceInfo={data?.service?.info} />
      <AddressInfoContainer addressInfo={data?.address?.info} />
    </>
  );
};

export default CompanyEditIndex;
