import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
  StyledSelect,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { response } from "types/globalTypes";

const DcodeRegisterBlock = styled(Responsive)``;

type registerProps = {
  productList: any;
  registerResult: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  productId: yup.string().required("품목을 선택해주세요."),
  basicFee: yup.number().required("배송료를 입력해주세요.").typeError("숫자만 입력 가능합니다."),
  freeCondition: yup.number().required("무료배송조건을 입력해주세요.").typeError("숫자만 입력 가능합니다."),
});

const DcodeRegister = ({
  productList,
  registerResult,
  onSubmit,
  modalVisible,
  setModalVisible,
}: registerProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: "",
      basicFee: "",
      freeCondition: "",
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
      <DcodeRegisterBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송코드 관리 /",
                  url: "/dcode/dcode",
                },
                {
                  name: "배송코드 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </DcodeRegisterBlock>
      <DcodeRegisterBlock>
        <StyledForm onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Description>
            <DescriptionContent
              span="12"
              label="품목"
              content={
                <StyledSelect
                  placeholder="품목"
                  label="productId"
                  optionList={productList}
                  register={register}
                  errors={errors}
                  status={errors.productId}
                  setValue={setValue}
                  align="vertical"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="배송료"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="배송료"
                  label="basicFee"
                  register={register}
                  errors={errors}
                  status={errors.basicFee}
                  endItem="원"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="무료배송조건"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="무료배송조건"
                  label="freeCondition"
                  register={register}
                  errors={errors}
                  status={errors.freeCondition}
                  endItem="원"
                />
              }
            />
          </Description>
          <ErrorMsg>{registerResult.message}</ErrorMsg>
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
          title="배송코드 등록"
          msg="등록에 성공하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate("/dcode/dcode")}
        />
      </DcodeRegisterBlock>
    </>
  );
};

export default DcodeRegister;
