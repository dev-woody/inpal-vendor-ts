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
  productList: { [key: string]: any }[];
  categoryList: { [key: string]: any }[];
  manufacturerList: { [key: string]: any }[];
  imageUpload: response;
  detailPage: response;
  setNewCategory: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
  onSelectManufact: (id: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, num: string) => void;
  onDetailUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: ({ data }: { data: object }) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  name: yup.string().required("그룹명을 입력해주세요."),
  goodGroupCategory: yup.string().required("그룹분류를 입력해주세요."),
  description: yup.string().required("그룹설명을 입력해주세요."),
  itemPerLine: yup.string().required("상품묶음표시를 입력해주세요."),
  productId: yup.string().required("품목을 선택해주세요."),
  productCategoryInfo: yup.object({
    productCategory1sts: yup
      .array()
      .of(yup.object({ id: yup.string() }))
      .min(1, "카테고리를 최소 1개이상 선택해주세요."),
    productCategory2nds: yup.array().of(yup.object({ id: yup.string() })),
    productCategory3rds: yup.array().of(yup.object({ id: yup.string() })),
  }),
  manufacturerId: yup.string().required("제조사를 선택해주세요."),
  images: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(""),
      })
    )
    .min(1, "대표 이미지는 필수로 등록해야합니다."),
  detailPage: yup.object({
    id: yup.string().required("상세페이지를 선택해주세요."),
  }),
});

const GoodsGroupRregister = ({
  user,
  productList,
  categoryList,
  manufacturerList,
  imageUpload,
  detailPage,
  setNewCategory,
  onSelectManufact,
  onImageUpload,
  onDetailUpload,
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
      name: "",
      goodGroupCategory: "",
      description: "",
      itemPerLine: "",
      productId: "",
      productCategoryInfo: {
        productCategory1sts: [{}],
        productCategory2nds: [{}],
        productCategory3rds: [{}],
      },
      manufacturerId: "",
      images: [{ id: "" }, { id: "" }, { id: "" }, { id: "" }, { id: "" }],
      detailPage: { id: "" },
    },
  });
  const navigate = useNavigate();
  const [imageArray, setImageArray] = useState<{ id: string }[]>([]);
  const newArray = JSON.parse(JSON.stringify(imageArray));
  const newCategory = JSON.parse(JSON.stringify(categoryList));

  function changeImage(id: string) {
    const deleteArray = newArray.filter(
      (list: { id: string }) => list.id !== id
    );
    deleteArray.push({ id });
    setImageArray(deleteArray);
  }

  function deleteImage(id: string) {
    const deleteArray = newArray.filter(
      (list: { id: string }) => list.id !== id
    );
    setImageArray(deleteArray);
  }

  useEffect(() => {
    let productCategory1sts: { id: string }[] = [];
    let productCategory2nds: { id: string }[] = [];
    let productCategory3rds: { id: string }[] = [];
    categoryList.map(
      (list1st) =>
        list1st.checked && productCategory1sts.push({ id: list1st.id })
    );
    categoryList.map((list1st) =>
      list1st.category2nd.map(
        (list2nd: any) =>
          list2nd.checked && productCategory2nds.push({ id: list2nd.id })
      )
    );
    categoryList.map((list1st) =>
      list1st.category2nd.map((list2nd: any) =>
        list2nd.category3rd.map(
          (list3rd: any) =>
            list3rd.checked && productCategory3rds.push({ id: list3rd.id })
        )
      )
    );
    setValue("productCategoryInfo", {
      productCategory1sts,
      productCategory2nds,
      productCategory3rds,
    });
  }, [categoryList, setValue]);

  useEffect(() => {
    setValue("images", imageArray);
  }, [imageArray, setValue]);

  useEffect(() => {
    if (detailPage.success) {
      setValue("detailPage", { id: detailPage.data.id });
    }
  }, [detailPage, setValue]);

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
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit({ data }),
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
                  placeholder="그룹명"
                  label="name"
                  register={register}
                  errors={errors}
                  status={errors.name}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="그룹분류"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="그룹분류"
                  label="goodGroupCategory"
                  register={register}
                  errors={errors}
                  status={errors.goodGroupCategory}
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
                  label="description"
                  register={register}
                  errors={errors}
                  status={errors.description}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="상품묶음표시"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="상품묶음표시"
                  label="itemPerLine"
                  register={register}
                  errors={errors}
                  status={errors.itemPerLine}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="품목"
              content={
                <StyledSelect
                  placeholder="품목"
                  label="productId"
                  optionList={productList?.filter(
                    (list: any) => list.openStatus === "OPEN"
                  )}
                  register={register}
                  errors={errors}
                  status={errors.productId}
                  setValue={setValue}
                  align="vertical"
                  actions={onSelectManufact}
                  index="2"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="품목분류"
              content={
                <StyledCategory
                  disable={categoryList.length > 0 ? false : true}
                  label="productCategoryInfo"
                  register={register}
                  status={errors.productCategoryInfo}
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
                  disable={manufacturerList ? false : true}
                  placeholder={
                    manufacturerList ? "제조사" : "품목을 선택해주세요."
                  }
                  label="manufacturerId"
                  optionList={manufacturerList}
                  register={register}
                  errors={errors}
                  status={errors.manufacturerId}
                  setValue={setValue}
                  align="vertical"
                  index="1"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="이미지"
              content={
                <div>
                  <div style={{ display: "flex", marginBottom: "0.75rem" }}>
                    <StyledUpload
                      readOnly
                      register={register}
                      placeholder="이미지"
                      label="images.id"
                      errors={errors}
                      status={errors.images}
                      action={changeImage}
                      onImageUpload={onImageUpload}
                      image={imageUpload}
                      deleteImage={deleteImage}
                      imageKind="images0"
                      isBox
                      num="0"
                      imageArray={imageArray}
                      thumnailUrl={`/construction/vendor/good/group/image/displayThumbnail`}
                      params={{
                        vendorId: user.vendorId,
                        id: imageUpload?.data?.id,
                      }}
                    />
                    <StyledUpload
                      readOnly
                      register={register}
                      placeholder="이미지"
                      label="images.id"
                      errors={errors}
                      status={errors.images}
                      action={changeImage}
                      onImageUpload={onImageUpload}
                      image={imageUpload}
                      deleteImage={deleteImage}
                      imageKind="images1"
                      isBox
                      num="1"
                      imageArray={imageArray}
                      thumnailUrl={`/construction/vendor/good/group/image/displayThumbnail`}
                      params={{
                        vendorId: user.vendorId,
                        id: imageUpload?.data?.id,
                      }}
                    />
                    <StyledUpload
                      readOnly
                      register={register}
                      placeholder="이미지"
                      label="images.id"
                      errors={errors}
                      status={errors.images}
                      action={changeImage}
                      onImageUpload={onImageUpload}
                      image={imageUpload}
                      deleteImage={deleteImage}
                      imageKind="images2"
                      isBox
                      num="2"
                      imageArray={imageArray}
                      thumnailUrl={`/construction/vendor/good/group/image/displayThumbnail`}
                      params={{
                        vendorId: user.vendorId,
                        id: imageUpload?.data?.id,
                      }}
                    />
                    <StyledUpload
                      readOnly
                      register={register}
                      placeholder="이미지"
                      label="images.id"
                      errors={errors}
                      status={errors.images}
                      action={changeImage}
                      onImageUpload={onImageUpload}
                      image={imageUpload}
                      deleteImage={deleteImage}
                      imageKind="images3"
                      isBox
                      num="3"
                      imageArray={imageArray}
                      thumnailUrl={`/construction/vendor/good/group/image/displayThumbnail`}
                      params={{
                        vendorId: user.vendorId,
                        id: imageUpload?.data?.id,
                      }}
                    />
                    <StyledUpload
                      readOnly
                      register={register}
                      placeholder="이미지"
                      label="images.id"
                      errors={errors}
                      status={errors.images}
                      action={changeImage}
                      onImageUpload={onImageUpload}
                      image={imageUpload}
                      deleteImage={deleteImage}
                      imageKind="images4"
                      isBox
                      num="4"
                      imageArray={imageArray}
                      thumnailUrl={`/construction/vendor/good/group/image/displayThumbnail`}
                      params={{
                        vendorId: user.vendorId,
                        id: imageUpload?.data?.id,
                      }}
                    />
                  </div>
                </div>
              }
            />
            <DescriptionContent
              span="12"
              label="상세페이지"
              content={
                <StyledUpload
                  // align="vertical"
                  readOnly
                  placeholder="상세페이지"
                  label="detailPage.id"
                  register={register}
                  errors={errors || "상세페이지는 필수입니다."}
                  status={errors.detailPage?.id}
                  onImageUpload={onDetailUpload}
                  image={detailPage}
                  deleteImage={deleteImage}
                  imageKind="detailPage"
                  isBox
                  imageArray={imageArray}
                  thumnailUrl={`/construction/vendor/good/group/detailPage/display`}
                  params={{
                    vendorId: user.vendorId,
                    id: detailPage?.data?.id,
                  }}
                />
              }
            />
          </Description>
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
          action={() => navigate("/goods")}
        />
      </GoodsGroupRregisterBlock>
    </>
  );
};

export default GoodsGroupRregister;
