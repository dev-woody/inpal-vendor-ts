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
  StyledToggle,
  StyledUpload,
  Table,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { response } from "types/globalTypes";
import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import PriceOption from "./addPriceOption";

const GoodsGroupItemRegisterBlock = styled(Responsive)``;

type ItemProps = {
  registerResult: response;
  isColorItem: "COLOR" | "IMAGE" | "MATERIAL";
  colorCode: response;
  goodsGroup: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

type submitValue = {
  basicInfo: {
    model: string;
    name: string;
    isOrderMade: false;
    colorCodeId: string;
  };
  dsInfo: {
    dsType: string;
    rgb: string;
    image: object;
  };
  priceInfo: {
    priceNumInfos: { specNumId: string; price: number; salePrice: number }[];
  };
  stock: number;
};

const schema = yup.object({
  basicInfo: yup.object({
    model: yup.string().required("모델명을 입력해주세요."),
    name: yup.string().required("상품명을 입력해주세요."),
    isOrderMade: yup.boolean(),
    colorCodeId: yup.string().required("색상코드를 입력해주세요."),
  }),
  dsInfo: yup.object({
    dsType: yup.string(),
    rgb: yup.string().nullable().required("색상코드를 입력해주세요."),
    image: yup.object().nullable().required("이미지를 등록해주세요."),
  }),
  stock: yup
    .number()
    .typeError("숫자를 입력해주세요.")
    .required("재고를 입력해주세요."),
  priceInfo: yup.object({
    priceNumInfos: yup
      .array()
      .of(
        yup.object({
          specNumId: yup.string(),
          price: yup.number(),
          salePrice: yup.number(),
        })
      )
      .min(1, "가격정보를 추가해주세요."),
  }),
});

const GoodsGroupItemRegister = ({
  registerResult,
  isColorItem,
  colorCode,
  goodsGroup,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
  id,
}: ItemProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      basicInfo: {
        model: "",
        name: "",
        isOrderMade: false,
        colorCodeId: "",
      },
      dsInfo: {
        dsType: "",
        rgb: "",
        image: {},
      },
      priceInfo: {
        priceNumInfos: [],
      },
      stock: null,
    },
  });

  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    setValue("dsInfo.dsType", isColorItem?.toLowerCase());
  }, []);

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
            (data) => onSubmit(data),
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
                  label="basicInfo.colorCodeId"
                  register={register}
                  errors={errors}
                  status={errors.basicInfo?.colorCodeId}
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
                  label="basicInfo.model"
                  register={register}
                  errors={errors}
                  status={errors.basicInfo?.model}
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
                  label="basicInfo.name"
                  register={register}
                  errors={errors}
                  status={errors.basicInfo?.name}
                />
              }
            />
            {isColorItem === "COLOR" ? (
              <DescriptionContent
                span="12"
                label="색상코드"
                content={
                  <StyledInput
                    align="vertical"
                    placeholder="색상코드"
                    label="dsInfo.rgb"
                    register={register}
                    errors={errors}
                    status={errors.dsInfo?.rgb}
                  />
                }
              />
            ) : (
              <DescriptionContent
                span="12"
                label="상품이미지"
                content={
                  <StyledUpload
                    readOnly
                    placeholder="상품이미지"
                    isBox
                    maxLength={1}
                    label="dsInfo.image"
                    register={register}
                    errors={errors || "상세페이지는 필수입니다."}
                    status={errors.dsInfo?.image}
                    subject="good_item"
                    type="ds_image"
                    successAction={(result: any) => {
                      const imageArray = {
                        imageInfo: { id: result[0].imageId },
                      };
                      setValue("dsInfo.image", imageArray);
                    }}
                  />
                }
              />
            )}
            <DescriptionContent
              span="12"
              label="재고"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="재고"
                  label="stock"
                  register={register}
                  errors={errors}
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
                    setIsToggle(data === "사용" ? false : true);
                    setValue(
                      "basicInfo.isOrderMade",
                      data === "사용" ? false : true
                    );
                  }}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="가격정보"
              content={
                <PriceOption
                  setPriceValue={setValue}
                  goodsGroup={goodsGroup}
                  errorsMsg={errors}
                  name="priceInfo.priceNumInfos"
                  setErrorParent={clearErrors}
                />
              }
            />
          </Description>
          <ErrorMsg>{registerResult.message}</ErrorMsg>
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
