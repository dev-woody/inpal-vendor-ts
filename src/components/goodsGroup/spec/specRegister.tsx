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
import { NavigateFunction } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { response } from "types/globalTypes";

const SpecRegisterBlock = styled(Responsive)``;

type registerProps = {
  productList: response;
  deliveryCode: response;
  unitCode: response;
  onSelectProduct: (id: string) => void;
  onSubmit: (data: object) => void;
  navigate: NavigateFunction;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  quantity: yup.number().required("용량을 입력해주세요.").typeError("숫자만 입력가능합니다."),
  unitId: yup.string().required("단위를 선택해주세요."),
  deliveryId: yup.string().required("배송그룹을 선택해주세요."),
});

const SpecRegister = ({
  productList,
  deliveryCode,
  unitCode,
  onSelectProduct,
  onSubmit,
  navigate,
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
      quantity: "",
      unitId: "",
      deliveryId: "",
    },
  });
  return (
    <>
      <SpecRegisterBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품사양 관리 /",
                  url: "/goods/spec",
                },
                {
                  name: "상품사양 등록",
                  url: "/goods/spec/register",
                },
              ]}
            />
          }
        />
      </SpecRegisterBlock>
      <SpecRegisterBlock>
        <StyledForm onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Description>
            <DescriptionContent
              span="12"
              label="품목선택"
              content={
                <StyledSelect
                  optionList={productList.data}
                  actions={onSelectProduct}
                  align="vertical"
                  placeholder="품목선택"
                />
              }
            />
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
                disable={unitCode.data ? false : true}
                placeholder={
                  unitCode.data ? "단위" : "품목을 선택해주세요."
                }
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
                disable={deliveryCode.data ? false : true}
                placeholder={
                  deliveryCode.data ? "배송코드" : "품목을 선택해주세요."
                }
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
          title="상품사양 등록"
          msg="상품사양 등록에 성공하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate("/goods/spec")}
        />
      </SpecRegisterBlock>
    </>
  );
};

export default SpecRegister;
