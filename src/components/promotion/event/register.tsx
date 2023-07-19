import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EventRegisterBlock = styled(Responsive)``;

type registerProps = {
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  title: yup.string().required("제목을 입력해주세요."),
});

const EventRegister = ({
  onSubmit,
  modalVisible,
  setModalVisible,
}: registerProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const navigate = useNavigate();
  return (
    <>
      <EventRegisterBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "이벤트 /",
                  url: "/promotion/event",
                },
                {
                  name: "이벤트 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </EventRegisterBlock>
      <EventRegisterBlock>
        <StyledForm onSubmit={handleSubmit((data) => onSubmit({ data }))}>
          <Description>
            <DescriptionContent
              span="12"
              label="제목"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="제목"
                  label="title"
                  register={register}
                  errors={errors.title?.message}
                  status={errors.title}
                />
              }
            />
          </Description>
          <Button
            disabled={isSubmitting}
            type="submit"
            needMarginTop
            status="primary"
            withInput
          >
            등록
          </Button>
        </StyledForm>
        <Modal
          title="이벤트 등록"
          msg="등록에 성공하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate("/promotion/event")}
        />
      </EventRegisterBlock>
    </>
  );
};

export default EventRegister;
