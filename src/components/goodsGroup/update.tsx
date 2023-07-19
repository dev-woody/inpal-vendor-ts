import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  StyledCategory,
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledUpload,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { changeSellStatus } from "lib/functions/changeInput";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GoodsGroupOptionContainer from "containers/goodsGroup/option/optionContainer";
import GoodsGroupItemsContainer from "containers/goodsGroup/items/itemsContainer";
import { NavigateFunction } from "react-router-dom";

const GoodsGroupDetailBlock = styled(Responsive)``;

type DetailProps = {
  user: any;
  id: string | undefined;
  goodsGroup: response;
  productList: { [key: string]: any }[];
  manufacturerList: { [key: string]: any }[];
  categoryList: { [key: string]: any }[];
  imageUpload: response;
  detailPage: response;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, num: string) => void;
  onDetailUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setNewCategory: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
  onSubmit: ({ data }: { data: any }) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const schema = yup.object({
  name: yup.string().required(),
  goodGroupCategory: yup.string().required(),
  description: yup.string().required(),
  itemPerLine: yup.string().required(),
  productCategoryInfo: yup.object({
    productCategory1sts: yup
      .array()
      .of(yup.object({ id: yup.string() }))
      .min(1, "카테고리를 최소 1개이상 선택해주세요."),
    productCategory2nds: yup.array().of(yup.object({ id: yup.string() })),
    productCategory3rds: yup.array().of(yup.object({ id: yup.string() })),
  }),
  manufacturerId: yup.string().required(),
  images: yup
    .array()
    .of(yup.object({ id: yup.string() }))
    .min(1, "이미지를 최소 1개이상 등록해주세요."),
  detailPage: yup.object({ id: yup.string() }).required(),
});

const GoodsGroupDetail = ({
  user,
  id,
  goodsGroup,
  productList,
  manufacturerList,
  categoryList,
  imageUpload,
  detailPage,
  onImageUpload,
  onDetailUpload,
  setNewCategory,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
}: DetailProps) => {
  const data = goodsGroup.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name,
      goodGroupCategory: data?.goodGroupCategory,
      description: data?.description,
      itemPerLine: data?.itemPerLine,
      productCategoryInfo: data?.productCategoryInfo,
      manufacturerId: data?.manufacturer?.id,
      images: [{}],
      detailPage: { id: "" },
    },
  });

  const [imageArray, setImageArray] = useState<{ id: string }[]>([]);
  const newArray = JSON.parse(JSON.stringify(imageArray));
  const newCategory = JSON.parse(JSON.stringify(categoryList));

  function propsThumnail(num: number) {
    let newThumnail = [];
    for (let i = 0; i < data?.images.length; i++) {
      newThumnail.push({ id: data?.images[i].id, num: data?.images[i].num });
    }
    return newThumnail.filter((list) => list.num === num)[0]?.id;
  }

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
    setValue("name", data?.name);
    setValue("goodGroupCategory", data?.goodGroupCategory);
    setValue("description", data?.description);
    setValue("itemPerLine", data?.itemPerLine);
    setValue("manufacturerId", data?.manufacturer?.id);
    setValue("detailPage", { id: data?.detailPage?.id });
  }, [goodsGroup, data, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Fragment>
      <GoodsGroupDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리 /",
                  url: "/goods/groups",
                },
                {
                  name: "상세정보 및 수정",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupDetailBlock>
      <GoodsGroupDetailBlock>
        <PageHeader title="상품그룹 상세정보" />
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit({ data }),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent label="코드" content={data?.code} />
            <DescriptionContent label="그룹명" content={data?.name} />
            <DescriptionContent
              span="12"
              label="그룹분류"
              content={
                <StyledInput
                  align="vertical"
                  placeholder={data?.goodGroupCategory}
                  label="goodGroupCategory"
                  register={register}
                  errors={errors.goodGroupCategory?.message}
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
                  placeholder={data?.description}
                  label="description"
                  register={register}
                  errors={errors.description?.message}
                  status={errors.description}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="그룹묶음표시"
              content={
                <StyledInput
                  align="vertical"
                  placeholder={data?.itemPerLine}
                  label="itemPerLine"
                  register={register}
                  errors={errors.itemPerLine?.message}
                  status={errors.itemPerLine}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="판매상태"
              content={changeSellStatus(data?.sellStatus)}
            />
            <DescriptionContent
              span="12"
              label="품목"
              content={data?.product.name}
            />
            <DescriptionContent
              span="12"
              label="품목 분류"
              content={
                <StyledCategory
                  disable={manufacturerList ? false : true}
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
                  placeholder={data?.manufacturer?.name}
                  label="manufacturerId"
                  optionList={manufacturerList}
                  register={register}
                  errors={errors.manufacturerId?.message}
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
                <>
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
                    thumnail={propsThumnail(0)}
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
                    thumnail={propsThumnail(1)}
                  />
                  <StyledUpload
                    readOnly
                    register={register}
                    placeholder="이미지"
                    label="images[2].id"
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
                    thumnail={propsThumnail(2)}
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
                    thumnail={propsThumnail(3)}
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
                    thumnail={propsThumnail(4)}
                  />
                </>
              }
            />
            <DescriptionContent
              span="12"
              label="상세페이지"
              content={
                <StyledUpload
                  readOnly
                  placeholder="상세페이지"
                  label="detailPage.id"
                  register={register}
                  errors={
                    errors.detailPage?.id?.message || "상세페이지는 필수입니다."
                  }
                  status={errors.detailPage?.id}
                  onImageUpload={onDetailUpload}
                  imageKind="detailPage"
                  isBox
                  imageArray={imageArray}
                  thumnailUrl={`/construction/vendor/good/group/detailPage/display`}
                  params={{
                    vendorId: user.vendorId,
                    id: detailPage?.data?.id,
                  }}
                  thumnail={detailPage?.data?.id}
                />
              }
            />
          </Description>
          <Button type="submit" status="primary" needMarginTop withInput>
            수정
          </Button>
          <Modal
            title="상품그룹 수정"
            msg="상품그룹 수정을 완료하였습니다."
            submitMsg="확인"
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            action={() => {
              if (typeof id === "string") {
                navigate(`/goods/groups/${id}`);
              }
            }}
          />
        </StyledForm>
      </GoodsGroupDetailBlock>
      <GoodsGroupOptionContainer />
      <GoodsGroupItemsContainer />
    </Fragment>
  );
};

export default GoodsGroupDetail;
