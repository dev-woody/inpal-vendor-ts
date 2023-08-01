import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
  Table,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { changeDays, changePhone } from "lib/functions/changeInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { masterAllListColumns } from "lib/columns/columnsList";
import { useEffect, useState } from "react";

const MyPageBlock = styled(Responsive)``;

type MasterProps = {
  findAll: response;
  master: response;
  user: any;
  changePass: response;
  onSubmit: (data: any) => void;
  onEditPass: (data: any) => void;
  onReset: (type: string) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  email: yup.string().required("이메일을 입력해주세요."),
  phone: yup.string().required("전화번호를 입력해주세요."),
});

const MyPage = ({
  user,
  findAll,
  master,
  changePass,
  onSubmit,
  onEditPass,
  onReset,
  modalVisible,
  setModalVisible,
}: MasterProps) => {
  const data = master.data;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const [editPass, setEditPass] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValue("email", data?.info.email);
    setValue("phone", changePhone(data?.info.phone));
  }, [master]);
  return (
    <>
      <MyPageBlock>
        <PageHeader
          title="마이페이지"
          extra={
            user?.isTopLevel ? (
              <>
                <Button
                  type="button"
                  onClick={() =>
                    navigate(`/vendor/${user.vendorId}/companyInfo`)
                  }
                >
                  기업정보 수정
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate(`/vendor/signUp`)}
                >
                  관리자 추가
                </Button>
              </>
            ) : undefined
          }
        />
      </MyPageBlock>
      <MyPageBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              label="아이디"
              content={data?.info?.signInfo.userId}
            />
            <DescriptionContent label="이름" content={data?.info?.name} />
            <DescriptionContent
              span="12"
              label="이메일"
              content={
                <StyledInput
                  align="vertical"
                  placeholder={data?.info.email}
                  label="email"
                  register={register}
                  errors={errors}
                  status={errors.email}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="전화번호"
              content={
                <StyledInput
                  align="vertical"
                  placeholder={changePhone(data?.phone)}
                  label="phone"
                  register={register}
                  errors={errors}
                  status={errors.phone}
                />
              }
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
              disabled={isSubmitting}
              onClick={() => navigate(`/mypage/${user.vendorId}`)}
            >
              뒤로가기
            </Button>
            {user.signInfo.userId === data?.info?.signInfo.userId && (
              <Button type="submit" status="primary" needMarginTop withInput>
                수정
              </Button>
            )}
          </div>
        </StyledForm>
        <Modal
          title="관리자 수정"
          msg="수정을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // action={() => navigate(`/admin/master`)}
        />
      </MyPageBlock>
      {user?.isTopLevel ? (
        <MyPageBlock>
          <PageHeader title="관리자 목록"></PageHeader>
          <Table
            columns={masterAllListColumns}
            content={findAll.data}
            url="/vendor/detail"
            moveKey={["info", "signInfo", "userId"]}
          />
        </MyPageBlock>
      ) : undefined}
    </>
  );
};

export default MyPage;
