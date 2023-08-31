import styled from "styled-components";
import {
  BreadCrumb,
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
  StyledUpload,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { response } from "types/globalTypes";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoodsGroupRregisterBlock = styled(Responsive)``;

type registerProps = {
  user: any;
  productList: response;
  propertyList: response;
  categoryList: { [key: string]: any }[];
  manufacturerList: response;
  goodsSpecList: response;
  groupRegister: response;
  setNewCategory: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
  onSelectProduct: (id: string) => void;
  onSubmit: (data: object) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  storeType: yup.string().required("판매속성을 선택해주세요"),
  dsType: yup.string().required("분류속성을 선택해주세요"),
  basicInfo: yup.object({
    name: yup.string().required("그룹명을 입력해주세요."),
    description: yup.string().required("그룹설명을 입력해주세요."),
    productId: yup.string().required("품목을 선택해주세요."),
    propertyId: yup.string().required("속성을 선택해주세요."),
    handleCategoryInfos: yup.object({
      categoryIds: yup.array().of(yup.string()),
    }),
    manufacturerId: yup.string().required("제조사를 선택해주세요."),
  }),
  detailPageInfo: yup.object({
    imageNumInfos: yup.array().of(
      yup.object({
        num: yup.string(),
        imageInfo: yup.object({
          id: yup.string(),
        }),
      })
    ),
  }),
  goodImageInfo: yup.object({
    imageNumInfos: yup.array().of(
      yup.object({
        num: yup.string(),
        imageInfo: yup.object({
          id: yup.string(),
        }),
      })
    ),
  }),
  specInfo: yup.object({
    specNumInfos: yup.array().of(
      yup.object({
        num: yup.string(),
        specId: yup.string(),
      })
    ),
  }),
});

const GoodsGroupRregister = ({
  user,
  productList,
  propertyList,
  categoryList,
  manufacturerList,
  goodsSpecList,
  groupRegister,
  setNewCategory,
  onSelectProduct,
  onSubmit,
  modalVisible,
  setModalVisible,
}: registerProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      storeType: "",
      dsType: "",
      basicInfo: {
        name: "",
        description: "",
        productId: "",
        propertyId: "",
        manufacturerId: "",
        handleCategoryInfos: {
          categoryIds: new Array(),
        },
      },
      detailPageInfo: {
        imageNumInfos: [{ num: 0, imageInfo: { id: "" } }],
      },
      goodImageInfo: {
        imageNumInfos: [{ num: 0, imageInfo: { id: "" } }],
      },
      specInfo: {
        specNumInfos: [{ num: 0, specId: "" }],
      },
    },
  });
  const navigate = useNavigate();
  const newCategory = JSON.parse(JSON.stringify(categoryList));

  useEffect(() => {
    const selectedCategoryList: string[] = [];
    categoryList.map(
      (list1st) => list1st.checked && selectedCategoryList.push(list1st.id)
    );
    categoryList.map((list1st) =>
      list1st.category2nd.map(
        (list2nd: any) =>
          list2nd.checked && selectedCategoryList.push(list2nd.id)
      )
    );
    categoryList.map((list1st) =>
      list1st.category2nd.map((list2nd: any) =>
        list2nd.category3rd.map(
          (list3rd: any) =>
            list3rd.checked && selectedCategoryList.push(list3rd.id)
        )
      )
    );
    setValue("basicInfo.handleCategoryInfos.categoryIds", selectedCategoryList);
  }, [categoryList, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <GoodsGroupRregisterBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리 /",
                  url: "/goods/groups",
                },
                {
                  name: "상품그룹 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupRregisterBlock>
      <GoodsGroupRregisterBlock>
        <PageHeader title="상품 그룹 등록" />
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="판매속성"
              content={
                <StyledSelect
                  placeholder="판매속성"
                  label="storeType"
                  optionList={[
                    {
                      id: "all",
                      name: "전체",
                    },
                    {
                      id: "construction",
                      name: "시공",
                    },
                    {
                      id: "self",
                      name: "셀프",
                    },
                  ]}
                  register={register}
                  errors={errors}
                  status={errors?.storeType}
                  setValue={setValue}
                  align="vertical"
                  index="6"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="분류속성"
              content={
                <StyledSelect
                  placeholder="분류속성"
                  label="dsType"
                  optionList={[
                    {
                      id: "color",
                      name: "색상",
                    },
                    {
                      id: "image",
                      name: "이미지",
                    },
                    {
                      id: "material",
                      name: "재료",
                    },
                  ]}
                  register={register}
                  errors={errors}
                  status={errors?.dsType}
                  setValue={setValue}
                  align="vertical"
                  index="5"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="그룹명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="그룹명"
                  label="basicInfo.name"
                  register={register}
                  errors={errors}
                  status={errors?.basicInfo?.name}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="그룹설명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="그룹설명"
                  label="basicInfo.description"
                  register={register}
                  errors={errors}
                  status={errors?.basicInfo?.description}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="품목"
              content={
                <StyledSelect
                  placeholder="품목"
                  label="basicInfo.productId"
                  optionList={productList.data}
                  register={register}
                  errors={errors}
                  status={errors?.basicInfo?.productId}
                  setValue={setValue}
                  align="vertical"
                  actions={onSelectProduct}
                  index="4"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="상품속성"
              content={
                <StyledSelect
                  disable={propertyList.data ? false : true}
                  placeholder={
                    propertyList.data ? "상품속성" : "품목을 선택해주세요."
                  }
                  label="basicInfo.propertyId"
                  optionList={propertyList.data}
                  register={register}
                  errors={errors}
                  status={errors?.basicInfo?.propertyId}
                  setValue={setValue}
                  align="vertical"
                  index="3"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="품목분류"
              content={
                <StyledCategory
                  disable={categoryList.length > 0 ? false : true}
                  label="basicInfo.handleCategoryInfos"
                  register={register}
                  status={errors?.basicInfo?.handleCategoryInfos}
                  errors={errors}
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="제조사"
              content={
                <StyledSelect
                  disable={manufacturerList.data ? false : true}
                  placeholder={
                    manufacturerList.data ? "제조사" : "품목을 선택해주세요."
                  }
                  label="basicInfo.manufacturerId"
                  optionList={manufacturerList.data}
                  register={register}
                  errors={errors}
                  status={errors?.basicInfo?.manufacturerId}
                  setValue={setValue}
                  align="vertical"
                  index="2"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="상품사양"
              content={
                <StyledSelect
                  disable={goodsSpecList.data ? false : true}
                  placeholder={
                    goodsSpecList.data ? "상품사양" : "품목을 선택해주세요."
                  }
                  label="specInfo.specNumInfos"
                  optionList={goodsSpecList.data}
                  register={register}
                  errors={errors}
                  status={errors?.specInfo?.specNumInfos}
                  multiple
                  setValue={(
                    label: "specInfo.specNumInfos",
                    selectedItemInfos: any[]
                  ) => {
                    const newSelectedSpec = selectedItemInfos.map(
                      (list: any, index: number) => {
                        return {
                          num: index,
                          specId: list.id,
                        };
                      }
                    );
                    setValue(label, newSelectedSpec);
                  }}
                  align="vertical"
                  index="1"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="상품이미지"
              content={
                <StyledUpload
                  readOnly
                  placeholder="상품이미지"
                  isBox
                  maxLength={10}
                  label="goodImageInfo.imageNumInfos"
                  register={register}
                  errors={errors || "상세페이지는 필수입니다."}
                  status={errors.goodImageInfo?.imageNumInfos}
                  subject="good_group"
                  type="good_image"
                  successAction={(result: any) => {
                    const imageArray = result.map(
                      (image: any, index: number) => {
                        return { num: index, imageInfo: { id: image.imageId } };
                      }
                    );
                    setValue("goodImageInfo.imageNumInfos", imageArray);
                  }}
                />
              }
            />
          </Description>
          <DescriptionContent
            span="12"
            label="상세페이지"
            content={
              <StyledUpload
                readOnly
                register={register}
                placeholder="상세페이지"
                label="detailPageInfo.imageNumInfos"
                isBox
                maxLength={10}
                errors={errors}
                status={errors.detailPageInfo?.imageNumInfos}
                subject="good_group"
                type="detail_page"
                successAction={(result: any) => {
                  const imageArray = result.map((image: any, index: number) => {
                    return { num: index, imageInfo: { id: image.imageId } };
                  });
                  setValue("detailPageInfo.imageNumInfos", imageArray);
                }}
              />
            }
          />
          <ErrorMsg>{groupRegister.message}</ErrorMsg>
          <Button type="submit" status="primary" withInput needMarginTop>
            등록
          </Button>
        </StyledForm>
        <Modal
          title="상품그룹 등록"
          msg="성공적으로 등록을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => navigate("/goods/groups")}
        />
      </GoodsGroupRregisterBlock>
    </>
  );
};

export default GoodsGroupRregister;
