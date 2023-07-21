import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
  Responsive,
  StyledCategory,
  StyledForm,
  StyledInput,
  StyledSelect,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { response } from "types/globalTypes";
import { useEffect } from "react";

const BasicInfoUpdateBlock = styled(Responsive)``;

type basicType = {
  basicInfo: any;
  productList: response;
  propertyList: response;
  // categoryList: { [key: string]: any }[];
  manufacturerList: response;
  onSubmit: (data: any) => void;
};

const schema = yup.object({
  name: yup.string().required("그룹명을 입력해주세요."),
  description: yup.string().required("그룹설명을 입력해주세요."),
  productId: yup.string().required("품목을 선택해주세요."),
  propertyId: yup.string().required("속성을 선택해주세요."),
  handleCategoryInfos: yup.object({
    categoryIds: yup.array().of(yup.string()),
  }),
  manufacturerId: yup.string().required("제조사를 선택해주세요."),
});

const BasicInfoUpdate = ({
  basicInfo,
  productList,
  propertyList,
  // categoryList,
  manufacturerList,
  onSubmit,
}: basicType) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      productId: "",
      propertyId: "",
      manufacturerId: "",
      handleCategoryInfos: {
        categoryIds: new Array(),
      },
    },
  });

  useEffect(() => {
    if (basicInfo) {
      setValue("name", basicInfo?.name);
      setValue("description", basicInfo?.description);
      setValue("productId", basicInfo?.product?.id);
      setValue("propertyId", basicInfo?.property?.id);
      setValue("manufacturerId", basicInfo?.manufacturer?.id);
    }
  }, [basicInfo]);

  return (
    <BasicInfoUpdateBlock>
      <PageHeader title="상품그룹 기본정보" />
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            span="12"
            label="그룹명"
            content={
              <StyledInput
                align="vertical"
                placeholder={basicInfo?.name}
                label="name"
                register={register}
                errors={errors}
                status={errors?.name}
              />
            }
          />
          <DescriptionContent
            span="12"
            label="그룹설명"
            content={
              <StyledInput
                align="vertical"
                placeholder={basicInfo?.description}
                label="description"
                register={register}
                errors={errors}
                status={errors?.description}
              />
            }
          />
          <DescriptionContent
            span="12"
            label="품목"
            content={
              <StyledSelect
                placeholder={basicInfo?.product.nameKr}
                label="productId"
                optionList={productList.data}
                register={register}
                errors={errors}
                status={errors?.productId}
                setValue={setValue}
                align="vertical"
                // actions={onSelectProduct}
                index="4"
              />
            }
          />
          <DescriptionContent
            span="12"
            label="상품속성"
            content={
              <StyledSelect
                placeholder={basicInfo?.property?.property}
                label="propertyId"
                optionList={propertyList.data}
                register={register}
                errors={errors}
                status={errors?.propertyId}
                setValue={setValue}
                align="vertical"
                index="3"
              />
            }
          />
          <DescriptionContent
            span="12"
            label="제조사"
            content={
              <StyledSelect
                placeholder={basicInfo?.manufacturer.nameKr}
                label="manufacturerId"
                optionList={manufacturerList.data}
                register={register}
                errors={errors}
                status={errors?.manufacturerId}
                setValue={setValue}
                align="vertical"
                index="2"
              />
            }
          />
        </Description>
        <Button type="submit" status="primary" withInput needMarginTop>
          수정
        </Button>
      </StyledForm>
    </BasicInfoUpdateBlock>
  );
};

export default BasicInfoUpdate;
