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
  StyledSelect,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { response } from "types/globalTypes";
import { NavigateFunction } from "react-router-dom";
import { useEffect } from "react";

const SpecDetailBlock = styled(Responsive)``;

type specDetailProps = {
  specDetail: response;
  deliveryCode: response;
  unitCode: response;
  onSubmit: (data: any) => void;
  navigate: NavigateFunction;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  quantity: yup.string().required("용량을 입력해주세요."),
  unitId: yup.string().required("단위를 선택해주세요."),
  deliveryId: yup.string().required("배송그룹을 선택해주세요."),
});

const SpecDetail = ({
  specDetail,
  deliveryCode,
  unitCode,
  onSubmit,
  navigate,
  modalVisible,
  setModalVisible,
}: specDetailProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: "",
      unitId: "",
      deliveryId: "",
    },
  });

  useEffect(() => {
    setValue("quantity", specDetail?.data?.info?.quantity);
    setValue("unitId", specDetail?.data?.info?.unit?.id);
    setValue("deliveryId", specDetail?.data?.info?.delivery?.id);
  }, []);
  return (
    <>
      <SpecDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품사양 관리 /",
                  url: "/goods/spec",
                },
                {
                  name: "상품사양 상세조회",
                  url: "/goods/spec/detail",
                },
              ]}
            />
          }
        />
      </SpecDetailBlock>
      <SpecDetailBlock>
        <StyledForm onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Description>
            <DescriptionContent
              span="12"
              label="용량"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="용량"
                  label="quantity"
                  register={register}
                  errors={errors}
                  status={errors.quantity}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="단위"
              content={
                <StyledSelect
                  placeholder={specDetail?.data?.info?.unit?.nameKr}
                  label="unitId"
                  optionList={unitCode.data}
                  register={register}
                  errors={errors}
                  status={errors.unitId}
                  setValue={setValue}
                  align="vertical"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="배송코드"
              content={
                <StyledSelect
                  placeholder={specDetail?.data?.info?.delivery?.code}
                  label="deliveryId"
                  optionList={deliveryCode.data}
                  register={register}
                  errors={errors}
                  status={errors.deliveryId}
                  setValue={setValue}
                  align="vertical"
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
          title="상품사양 수정"
          msg="상품사양 수정에 성공하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate("/goods/spec")}
        />
      </SpecDetailBlock>
    </>
  );
};

export default SpecDetail;
