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
  onSubmit: ({ data }: { data: any }) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

const schema = yup.object({
  basicInfo: yup.object({
    model: yup.string(),
    name: yup.string(),
    isOrderMade: yup.boolean(),
    colorCodeId: yup.string(),
  }),
  dsInfo: yup.object({
    dsType: yup.string(),
    color: yup.object({
      rgb: yup.string(),
    }),
  }),
  priceInfo: yup.object({
    priceNumInfos: yup.array().of(
      yup.object({
        specNumId: yup.string(),
        price: yup.number(),
        salePrice: yup.number(),
      })
    ),
  }),
});

const GoodsGroupItemRegister = ({
  dcode,
  isColorItem,
  colorCode,
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
      basicInfo: {
        model: "",
        name: "",
        isOrderMade: false,
        colorCodeId: "",
      },
      dsInfo: {
        dsType: "color",
        color: { rgb: "" },
        // "image": {"imageInfo": {"id": ""}} ,
      },
      priceInfo: {
        priceNumInfos: [
          {
            specNumId: "",
            price: "",
            salePrice: "",
          },
        ],
      },
      stock: "",
    },
  });

  const [isToggle, setIsToggle] = useState(false);

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
                {/* <DescriptionContent
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
                /> */}
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
