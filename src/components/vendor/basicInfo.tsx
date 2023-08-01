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

const BasicInfoBlock = styled(Responsive)``;

type PropsType = {
  basicInfoUpdate: response;
  basicInfo: any;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  name: yup.string().required("이메일을 입력해주세요."),
  ceo: yup.string().required("전화번호를 입력해주세요."),
  logoImageInfo: yup.object({
    id: yup.string(),
  }),
});

const BasicInfo = ({
  basicInfoUpdate,
  basicInfo,
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
      ceo: "",
      logoImageInfo: { id: "" },
    },
  });

  useEffect(() => {
    setValue("name", basicInfo?.name);
    setValue("ceo", basicInfo?.ceo);
  }, [basicInfo]);

  return (
    <BasicInfoBlock>
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            label="회사명"
            content={
              <StyledInput
                align="vertical"
                placeholder={basicInfo?.name}
                label="name"
                register={register}
                errors={errors}
                status={errors.name}
              />
            }
          />
          <DescriptionContent
            label="대표명"
            content={
              <StyledInput
                align="vertical"
                placeholder={basicInfo?.ceo}
                label="ceo"
                register={register}
                errors={errors}
                status={errors.ceo}
              />
            }
          />
          <DescriptionContent
            label="로고이미지"
            content={
              <StyledUpload
                readOnly
                placeholder="로고이미지"
                label="logoImageInfo"
                fullWidth
                isBox
                maxLength="1"
                register={register}
                errors={errors}
                status={errors.logoImageInfo}
                action={() => console.log()}
                subject="VENDOR"
                type="LOGO"
                isThumbnailImage={[{ imageId: basicInfo?.logoImage.id }]}
                successAction={(result: any) => {
                  const imageArray = result.map((image: any) => {
                    return { id: image.imageId };
                  });
                  setValue("logoImageInfo", imageArray[0]);
                }}
              />
            }
          />
        </Description>
        <ErrorMsg>{basicInfoUpdate.message}</ErrorMsg>
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
    </BasicInfoBlock>
  );
};

export default BasicInfo;
