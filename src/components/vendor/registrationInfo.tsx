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

const RegistrationInfoBlock = styled(Responsive)``;

type PropsType = {
  registrationInfoUpdate: response;
  registrationInfo: any;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  number: yup.string().required("사업자등록증번호를 입력해주세요."),
  sector: yup.string().required("업태를 입력해주세요."),
  detail: yup.string().required("업종을 입력해주세요."),
  emailOrderNumber: yup.string().required("통신판매업번호를 입력해주세요."),
  registrationImageInfo: yup.object({
    id: yup.string(),
  }),
});

const RegistrationInfo = ({
  registrationInfoUpdate,
  registrationInfo,
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
      number: "",
      sector: "",
      detail: "",
      emailOrderNumber: "",
      registrationImageInfo: { id: "" },
    },
  });

  useEffect(() => {
    setValue("number", registrationInfo?.number);
    setValue("sector", registrationInfo?.sector);
    setValue("detail", registrationInfo?.detail);
    setValue("emailOrderNumber", registrationInfo?.emailOrderNumber);
    setValue(
      "registrationImageInfo.id",
      registrationInfo?.registrationImage.id
    );
  }, [registrationInfo]);

  return (
    <RegistrationInfoBlock>
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            label="사업자등록증번호"
            content={
              <StyledInput
                align="vertical"
                placeholder={registrationInfo?.number}
                label="number"
                register={register}
                errors={errors}
                status={errors.number}
              />
            }
          />
          <DescriptionContent
            label="업태"
            content={
              <StyledInput
                align="vertical"
                placeholder={registrationInfo?.sector}
                label="sector"
                register={register}
                errors={errors}
                status={errors.sector}
              />
            }
          />
          <DescriptionContent
            label="업종"
            content={
              <StyledInput
                align="vertical"
                placeholder={registrationInfo?.detail}
                label="detail"
                register={register}
                errors={errors}
                status={errors.detail}
              />
            }
          />
          <DescriptionContent
            label="통신판매업번호"
            content={
              <StyledInput
                align="vertical"
                placeholder={registrationInfo?.emailOrderNumber}
                label="emailOrderNumber"
                register={register}
                errors={errors}
                status={errors.emailOrderNumber}
              />
            }
          />
          <DescriptionContent
            label="사업자등록증"
            content={
              <StyledUpload
                readOnly
                placeholder="로고이미지"
                label="registrationImageInfo"
                fullWidth
                isBox
                maxLength="1"
                register={register}
                errors={errors}
                status={errors.registrationImageInfo}
                action={() => console.log()}
                subject="VENDOR"
                type="LOGO"
                isThumbnailImage={[
                  { imageId: registrationInfo?.registrationImage.id },
                ]}
                successAction={(result: any) => {
                  const imageArray = result.map((image: any) => {
                    return { id: image.imageId };
                  });
                  setValue("registrationImageInfo", imageArray[0]);
                }}
              />
            }
          />
        </Description>
        <ErrorMsg>{registrationInfoUpdate.message}</ErrorMsg>
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
    </RegistrationInfoBlock>
  );
};

export default RegistrationInfo;
