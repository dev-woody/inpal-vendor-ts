import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
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

const DescriptionBlock = styled.div`
  margin: 0.25rem 0;
  font-size: 0.875rem;

  & + & {
    margin-left: 0.25rem;
  }
`;

type basicType = {
  updateResult: response;
  basicInfo: any;
  propertyList: response;
  categoryList: { [key: string]: any }[];
  setNewCategory: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
  manufacturerList: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
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
  updateResult,
  basicInfo,
  propertyList,
  categoryList,
  setNewCategory,
  manufacturerList,
  onSubmit,
  modalVisible,
  setModalVisible,
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

  const newCategory = JSON.parse(JSON.stringify(categoryList));

  const DivideDepth = () => <DescriptionBlock>{">"}</DescriptionBlock>;

  function createDescriptionElement(category: any) {
    const descriptionElements = [];

    if (category.checked) {
      if (category.category2nd?.some((item: any) => item.checked)) {
        category.category2nd.forEach((secondItem: any) => {
          if (secondItem.checked) {
            if (
              secondItem.category3rd?.some((subItem: any) => subItem.checked)
            ) {
              category.category2nd?.forEach((secondItem: any) => {
                secondItem.category3rd?.forEach((thirdItem: any) => {
                  if (thirdItem.checked) {
                    descriptionElements.push(
                      <div
                        key={
                          category.description +
                          secondItem.description +
                          thirdItem.description
                        }
                        style={{ display: "flex" }}
                      >
                        <DescriptionBlock>
                          {category.description}
                        </DescriptionBlock>
                        <DivideDepth />
                        <DescriptionBlock>
                          {secondItem.description}
                        </DescriptionBlock>
                        <DivideDepth />
                        <DescriptionBlock>
                          {thirdItem.description}
                        </DescriptionBlock>
                      </div>
                    );
                  }
                });
              });
            } else {
              descriptionElements.push(
                <div
                  key={category.description + secondItem.description}
                  style={{ display: "flex" }}
                >
                  <DescriptionBlock>{category.description}</DescriptionBlock>
                  <DivideDepth />
                  <DescriptionBlock>{secondItem.description}</DescriptionBlock>
                </div>
              );
            }
          }
        });
      } else {
        descriptionElements.push(
          <div key={category.description}>
            <DescriptionBlock>{category.description}</DescriptionBlock>
          </div>
        );
      }
    }

    return descriptionElements;
  }

  const DisplayDescription = () => {
    const renderDescription = newCategory.map((categorys: any) => {
      return (
        <div key={categorys.description} style={{ marginTop: "0.5rem" }}>
          {createDescriptionElement(categorys)}
        </div>
      );
    });
    return renderDescription;
  };

  useEffect(() => {
    let categoryIds: string[] = [];
    categoryList.map(
      (list1st) => list1st.checked && categoryIds.push(list1st.id)
    );
    categoryList.map((list1st) =>
      list1st.category2nd.map(
        (list2nd: any) => list2nd.checked && categoryIds.push(list2nd.id)
      )
    );
    categoryList.map((list1st) =>
      list1st.category2nd.map((list2nd: any) =>
        list2nd.category3rd.map(
          (list3rd: any) => list3rd.checked && categoryIds.push(list3rd.id)
        )
      )
    );
    setValue("handleCategoryInfos.categoryIds", categoryIds);
  }, [categoryList, setValue]);

  useEffect(() => {
    if (basicInfo) {
      setValue("name", basicInfo?.info.name);
      setValue("description", basicInfo?.info.description);
      setValue("productId", basicInfo?.info.product?.id);
      setValue("propertyId", basicInfo?.info.property?.id);
      setValue("manufacturerId", basicInfo?.info?.manufacturer?.id);
    }
  }, [basicInfo]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

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
            content={basicInfo?.info.product.info.nameKr}
          />
          <DescriptionContent
            span="12"
            label="품목 분류"
            content={
              <div>
                <StyledCategory
                  disable={categoryList.length > 0 ? false : true}
                  label="handleCategoryInfos"
                  register={register}
                  status={errors?.handleCategoryInfos}
                  errors={errors}
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                />
                <DisplayDescription />
              </div>
            }
          />
          <DescriptionContent
            span="12"
            label="상품속성"
            content={
              <StyledSelect
                placeholder={basicInfo?.info.property?.info.property}
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
                placeholder={
                  basicInfo?.info.manufacturer.info.basic.info.nameKr
                }
                label="manufacturerId"
                optionList={manufacturerList?.data}
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
        <ErrorMsg>{updateResult.message}</ErrorMsg>
        <Button type="submit" status="primary" withInput needMarginTop>
          수정
        </Button>
      </StyledForm>
      <Modal
        title="기본정보 수정"
        msg="수정을 완료하였습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </BasicInfoUpdateBlock>
  );
};

export default BasicInfoUpdate;
