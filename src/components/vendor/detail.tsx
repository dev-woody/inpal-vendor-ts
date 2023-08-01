import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive } from "lib/styles";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { changeDays, changePhone } from "lib/functions/changeInput";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { response } from "types/globalTypes";

type MasterProps = {
  master: response;
  user: any;
};

const VendorDetailBlock = styled(Responsive)``;

const VendorDetail = ({ user, master }: MasterProps) => {
  const data = master.data;

  const navigate = useNavigate();
  return (
    <Fragment>
      <VendorDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "마스터 조회 /",
                  url: "/admin/master",
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </VendorDetailBlock>
      <VendorDetailBlock>
        <PageHeader title={`${data?.info.signInfo.userId} 상세정보`} />
        <Description>
          <DescriptionContent
            label="아이디"
            content={data?.info?.signInfo.userId}
          />
          <DescriptionContent label="이름" content={data?.info?.name} />
          <DescriptionContent label="이메일" content={data?.info.email} />
          <DescriptionContent
            label="전화번호"
            content={changePhone(data?.info.phone)}
          />
          <DescriptionContent
            label="생성일"
            content={changeDays(data?.base.createdAt)}
          />
          <DescriptionContent
            label="수정일"
            content={changeDays(data?.base.updatedAt)}
          />
          <DescriptionContent
            label="권한"
            content={data?.info.isTopLevel ? "최고권한" : "하위권한"}
          />
        </Description>
        <div>
          <Button
            type="button"
            needMarginTop
            withInput
            onClick={() => navigate(`/mypage/${user.vendorId}`)}
          >
            뒤로가기
          </Button>
        </div>
      </VendorDetailBlock>
    </Fragment>
  );
};

export default VendorDetail;
