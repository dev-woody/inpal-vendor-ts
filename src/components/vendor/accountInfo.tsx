import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
  StyledUpload,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { response } from "types/globalTypes";

const AccountInfoBlock = styled(Responsive)``;

type PropsType = {
  accountInfoUpdate: response;
  accountInfo: any;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  name: yup.string().required("예금주명을 입력해주세요."),
  bank: yup.string().required("은행명을 입력해주세요."),
  number: yup.string().required("계좌번호를 입력해주세요."),
  accountImageInfo: yup.object({
    id: yup.string(),
  }),
});

const AccountInfo = ({
  accountInfoUpdate,
  accountInfo,
  onSubmit,
  modalVisible,
  setModalVisible,
}: PropsType) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      bank: "",
      number: "",
      accountImageInfo: { id: "" },
    },
  });

  useEffect(() => {
    setValue("name", accountInfo?.name);
    setValue("bank", accountInfo?.bank);
    setValue("number", accountInfo?.number);
    setValue("accountImageInfo.id", accountInfo?.accountImage.id);
  }, [accountInfo]);

  return (
    <AccountInfoBlock>
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            label="예금주명"
            content={
              <StyledInput
                align="vertical"
                placeholder={accountInfo?.name}
                label="name"
                register={register}
                errors={errors}
                status={errors.name}
              />
            }
          />
          <DescriptionContent
            label="은행명"
            content={
              <StyledInput
                align="vertical"
                placeholder={accountInfo?.bank}
                label="bank"
                register={register}
                errors={errors}
                status={errors.bank}
              />
            }
          />
          <DescriptionContent
          span="12"
            label="계좌번호"
            content={
              <StyledInput
                align="vertical"
                placeholder={accountInfo?.number}
                label="number"
                register={register}
                errors={errors}
                status={errors.number}
              />
            }
          />
          <DescriptionContent
            label="통장사본"
            content={
              <StyledUpload
                readOnly
                placeholder="로고이미지"
                label="accountImageInfo"
                fullWidth
                isBox
                maxLength="1"
                register={register}
                errors={errors}
                status={errors.accountImageInfo}
                action={() => console.log()}
                subject="VENDOR"
                type="LOGO"
                isThumbnailImage={[{ imageId: accountInfo?.accountImage.id }]}
                successAction={(result: any) => {
                  const imageArray = result.map((image: any) => {
                    return { id: image.imageId };
                  });
                  setValue("accountImageInfo", imageArray[0]);
                }}
              />
            }
          />
        </Description>
        <ErrorMsg>{accountInfoUpdate.message}</ErrorMsg>
        <Button type="submit" status="primary" needMarginTop withInput>
          수정
        </Button>
      </StyledForm>
      <Modal
        title="기업정보 수정"
        msg="기업정보 수정을 완료하였습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </AccountInfoBlock>
  );
};

export default AccountInfo;
