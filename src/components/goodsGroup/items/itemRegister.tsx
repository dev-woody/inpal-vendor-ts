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
  StyledToggle,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { response } from "types/globalTypes";
import { Fragment, useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";

const GoodsGroupItemRegisterBlock = styled(Responsive)``;

type ItemProps = {
  dcode: response;
  isColorItem: boolean;
  colorCode: response;
  unitCode: response;
  onSubmit: ({ data }: { data: any }) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

const schema = yup.object({
  colorCodeId: yup.string().required(),
  model: yup.string().required(),
  name: yup.string().required(),
  vendorDeliveryId: yup.string().required(),
  stock: yup.string().required(),
  isOrderMade: yup.boolean().required(),
  isColorItem: yup.boolean().required(),
  colorItem: yup
    .object({
      colorRgb: yup.string(),
      capacity: yup.string(),
      unit: yup.string(),
      basicPrice: yup.string(),
      saleRatio: yup.string(),
      pointRatio: yup.string(),
    })
    .nullable(true),
  imageItem: yup.object().nullable(true),
});

const GoodsGroupItemRegister = ({
  dcode,
  isColorItem,
  colorCode,
  unitCode,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
  id,
}: ItemProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      colorCodeId: "",
      model: "",
      name: "",
      vendorDeliveryId: "",
      stock: "",
      isColorItem: false,
      isOrderMade: false,
      colorItem: {
        colorRgb: "",
        capacity: "",
        unit: "",
        basicPrice: "",
        saleRatio: "",
        pointRatio: "",
      },
      imageItem: null,
    },
  });

  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    setValue("isOrderMade", isToggle);
  }, [isToggle, setValue]);

  useEffect(() => {
    if (isColorItem) {
      setValue("isColorItem", true);
    } else {
      setValue("isColorItem", false);
    }
  }, [isColorItem, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <GoodsGroupItemRegisterBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리 /",
                  url: "/goods/groups",
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/goods/groups/detail/${id}`,
                },
                {
                  name: "아이템 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupItemRegisterBlock>
      <GoodsGroupItemRegisterBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit({ data }),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="색상계열"
              content={
                <StyledSelect
                  optionList={colorCode.data}
                  placeholder="색상계열"
                  label="colorCodeId"
                  register={register}
                  errors={errors.colorCodeId?.message}
                  status={errors.colorCodeId}
                  setValue={setValue}
                  align="vertical"
                  // actions={onSelectManufact}
                  index="2"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="모델명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="모델명"
                  label="model"
                  register={register}
                  errors={errors.model?.message}
                  status={errors.model}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="상품명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="상품명"
                  label="name"
                  register={register}
                  errors={errors.name?.message}
                  status={errors.name}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="배송코드"
              content={
                <StyledSelect
                  optionList={dcode.data}
                  align="vertical"
                  placeholder="배송코드"
                  label="vendorDeliveryId"
                  register={register}
                  errors={errors.vendorDeliveryId?.message}
                  status={errors.vendorDeliveryId}
                  setValue={setValue}
                  // actions={onSelectManufact}
                  index="1"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="재고"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="재고"
                  label="stock"
                  register={register}
                  errors={errors.stock?.message}
                  status={errors.stock}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="주문시 환불 불가"
              content={
                <StyledToggle
                  data={isToggle ? "사용" : "미사용"}
                  openStatus="사용"
                  action={(data) => {
                    setIsToggle(!isToggle);
                  }}
                />
                // <StyledInput
                //   align="vertical"
                //   placeholder="주문시 환불 불가"
                //   label="isOrderMade"
                //   register={register}
                //   errors={errors.isOrderMade?.message}
                //   status={errors.isOrderMade}
                // />
              }
            />
            {isColorItem ? (
              <Fragment>
                <DescriptionContent
                  span="12"
                  label="색상코드"
                  content={
                    <StyledInput
                      align="vertical"
                      placeholder="색상코드"
                      label="colorItem.colorRgb"
                      register={register}
                      errors={errors.colorItem?.colorRgb?.message}
                      status={errors.colorItem?.colorRgb}
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
                      label="colorItem.capacity"
                      register={register}
                      errors={errors.colorItem?.capacity?.message}
                      status={errors.colorItem?.capacity}
                    />
                  }
                />
                <DescriptionContent
                  span="12"
                  label="단위"
                  content={
                    <StyledSelect
                      optionList={unitCode.data?.filter(
                        (list: any) => list.openStatus === "OPEN"
                      )}
                      align="vertical"
                      placeholder="단위"
                      label="colorItem.unit"
                      register={register}
                      errors={errors.colorItem?.unit?.message}
                      status={errors.colorItem?.unit}
                      setValue={setValue}
                      // actions={onSelectManufact}
                      index="1"
                    />
                  }
                />
                <DescriptionContent
                  span="12"
                  label="정상가격"
                  content={
                    <StyledInput
                      align="vertical"
                      placeholder="정상가격"
                      label="colorItem.basicPrice"
                      register={register}
                      errors={errors.colorItem?.basicPrice?.message}
                      status={errors.colorItem?.basicPrice}
                    />
                  }
                />
                <DescriptionContent
                  span="12"
                  label="할인율"
                  content={
                    <StyledInput
                      align="vertical"
                      placeholder="할인율"
                      label="colorItem.saleRatio"
                      register={register}
                      errors={errors.colorItem?.saleRatio?.message}
                      status={errors.colorItem?.saleRatio}
                    />
                  }
                />
                <DescriptionContent
                  span="12"
                  label="적립률"
                  content={
                    <StyledInput
                      align="vertical"
                      placeholder="적립률"
                      label="colorItem.pointRatio"
                      register={register}
                      errors={errors.colorItem?.pointRatio?.message}
                      status={errors.colorItem?.pointRatio}
                    />
                  }
                />
              </Fragment>
            ) : null}
            {/* <DescriptionContent
            span="12"
            label="최종금액"
            content={() => {
              return getValues("colorItem.basicPrice");
            }}
          /> */}
          </Description>
          <Button type="submit" status="primary" withInput needMarginTop>
            등록
          </Button>
        </StyledForm>
        <Modal
          title="상품 등록"
          msg="상품등록을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => {
            if (typeof id === "string") {
              navigate(`/goods/groups/detail/${id}`);
            }
          }}
        />
      </GoodsGroupItemRegisterBlock>
    </>
  );
};

export default GoodsGroupItemRegister;
