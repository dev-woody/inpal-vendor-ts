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
import { response } from "types/globalTypes";
import { NavigateFunction } from "react-router-dom";
import { useEffect } from "react";
import { priceToString } from "lib/functions/changeInput";

const SpecDetailBlock = styled(Responsive)``;

type specDetailProps = {
  specDetail: response;
  specUpdate: response;
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
  specUpdate,
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
    setValue("unitId", specDetail?.data?.info?.unit.id);
    setValue("deliveryId", specDetail?.data?.info?.delivery?.id);
  }, [specDetail, specUpdate]);
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
                  placeholder={specDetail?.data?.info?.unit?.info?.nameKr}
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
                <>
                  <StyledSelect
                    placeholder={
                      priceToString(
                        specDetail?.data?.info?.delivery.info.basicFee
                      ) +
                      "원 /" +
                      priceToString(
                        specDetail?.data?.info?.delivery.info.freeCondition
                      ) +
                      "원"
                    }
                    label="deliveryId"
                    optionList={deliveryCode.data}
                    register={register}
                    errors={errors}
                    status={errors.deliveryId}
                    setValue={setValue}
                    align="vertical"
                  />
                  <span style={{ marginLeft: "0.5rem", fontSize: "0.875rem" }}>
                    ( 배송료 / 무료배송조건 )
                  </span>
                </>
              }
            />
          </Description>
          <ErrorMsg>{specUpdate.message}</ErrorMsg>
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
