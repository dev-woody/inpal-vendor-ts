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
  StyledSearchInput,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { response } from "types/globalTypes";
import ModalPostCode from "lib/functions/postCode";

const AddressInfoBlock = styled(Responsive)``;

type PropsType = {
  addressInfoUpdate: response;
  addressInfo: any;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  zipCode: yup.string().required("우편번호를 입력해주세요."),
  basic: yup.string().required("기본주소를 입력해주세요."),
  detail: yup.string().required("상세주소를 입력해주세요."),
  manager: yup.string().required("관리자명을 입력해주세요."),
  phone: yup.string().required("관리자번호를 입력해주세요."),
  mobile: yup.string().required("관리자번호를 입력해주세요."),
});

const AddressInfo = ({
  addressInfoUpdate,
  addressInfo,
  onSubmit,
  modalVisible,
  setModalVisible,
}: PropsType) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      zipCode: "",
      basic: "",
      detail: "",
      manager: "",
      phone: "",
      mobile: "",
    },
  });

  const [postCodeVisible, setPostCodeVisible] = useState<boolean>(false);

  useEffect(() => {
    setValue("zipCode", addressInfo?.zipCode);
    setValue("basic", addressInfo?.basic);
    setValue("detail", addressInfo?.detail);
    setValue("manager", addressInfo?.manager);
    setValue("phone", addressInfo?.phone);
    setValue("mobile", addressInfo?.mobile);
  }, [addressInfo]);

  return (
    <AddressInfoBlock>
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            label="우편번호"
            content={
              <StyledSearchInput
                placeholder="우편번호"
                label="zipCode"
                fullWidth
                register={register}
                disable={true}
                // errors={errors}
                status={errors.zipCode}
                action={() => setPostCodeVisible(true)}
              />
            }
          />
          <Modal
            title="우편번호 조회"
            msg={
              <ModalPostCode
                setIsModalVisible={setPostCodeVisible}
                action={(zipCode: any, address: any) => {
                  setValue("zipCode", `${zipCode}`);
                  setValue("basic", `${address}`);
                  clearErrors("zipCode");
                  clearErrors("basic");
                }}
              />
            }
            modalVisible={postCodeVisible}
            setModalVisible={setPostCodeVisible}
            submitMsg="닫기"
          />
          <DescriptionContent
            label="기본주소"
            content={
              <StyledInput
                align="vertical"
                placeholder={addressInfo?.basic}
                label="basic"
                register={register}
                errors={errors}
                status={errors.basic}
                readOnly
              />
            }
          />
          <DescriptionContent
            label="상세주소"
            content={
              <StyledInput
                align="vertical"
                placeholder={addressInfo?.detail}
                label="detail"
                register={register}
                errors={errors}
                status={errors.detail}
                readOnly
              />
            }
          />
          <DescriptionContent
            label="관리자명"
            content={
              <StyledInput
                align="vertical"
                placeholder={addressInfo?.manager}
                label="manager"
                register={register}
                errors={errors}
                status={errors.manager}
              />
            }
          />
          <DescriptionContent
            label="전화번호"
            content={
              <StyledInput
                align="vertical"
                placeholder={addressInfo?.phone}
                label="phone"
                register={register}
                errors={errors}
                status={errors.phone}
              />
            }
          />
          <DescriptionContent
            label="휴대전화번호"
            content={
              <StyledInput
                align="vertical"
                placeholder={addressInfo?.mobile}
                label="mobile"
                register={register}
                errors={errors}
                status={errors.mobile}
              />
            }
          />
        </Description>
        <ErrorMsg>{addressInfoUpdate.message}</ErrorMsg>
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
    </AddressInfoBlock>
  );
};

export default AddressInfo;
