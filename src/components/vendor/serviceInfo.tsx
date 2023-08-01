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
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { response } from "types/globalTypes";

const ServiceInfoBlock = styled(Responsive)``;

type PropsType = {
  serviceInfoUpdate: response;
  serviceInfo: any;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  phone: yup.string().required("상담번호를 입력해주세요."),
  startTime: yup.string().required("시작시간을 입력해주세요."),
  endTime: yup.string().required("종료시간을 입력해주세요."),
});

const ServiceInfo = ({
  serviceInfoUpdate,
  serviceInfo,
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
      phone: "",
      startTime: "",
      endTime: "",
    },
  });

  useEffect(() => {
    setValue("phone", serviceInfo?.phone);
    setValue("startTime", serviceInfo?.startTime);
    setValue("endTime", serviceInfo?.endTime);
  }, [serviceInfo]);

  return (
    <ServiceInfoBlock>
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            label="상담번호"
            content={
              <StyledInput
                align="vertical"
                placeholder={serviceInfo?.phone}
                label="phone"
                register={register}
                errors={errors}
                status={errors.phone}
              />
            }
          />
          <DescriptionContent
            label="시작시간"
            content={
              <StyledInput
                align="vertical"
                placeholder={serviceInfo?.startTime}
                label="startTime"
                register={register}
                errors={errors}
                status={errors.startTime}
              />
            }
          />
          <DescriptionContent
            label="종료시간"
            content={
              <StyledInput
                align="vertical"
                placeholder={serviceInfo?.endTime}
                label="endTime"
                register={register}
                errors={errors}
                status={errors.endTime}
              />
            }
          />
        </Description>
        <ErrorMsg>{serviceInfoUpdate.message}</ErrorMsg>
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
    </ServiceInfoBlock>
  );
};

export default ServiceInfo;
