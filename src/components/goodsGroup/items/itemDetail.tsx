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
import { response } from "types/globalTypes";
import { changeDays, changeSellStatus } from "lib/functions/changeInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigateFunction } from "react-router-dom";

const GoodsGroupItemDetailBlock = styled(Responsive)``;

type ItemProps = {
  itemData: response;
  dcode: response;
  colorCode: response;
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
});

const GoodsGroupItemDetail = ({
  itemData,
  dcode,
  colorCode,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
  id,
}: ItemProps) => {
  const data = itemData.data;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      colorCodeId: data?.colorCodeId,
      model: data?.model,
      name: data?.name,
      vendorDeliveryId: data?.vendorDeliveryId,
    },
  });
  return (
    <>
      <GoodsGroupItemDetailBlock>
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
                  name: "아이템 상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupItemDetailBlock>
      <GoodsGroupItemDetailBlock>
        <PageHeader title="상품 상세정보" />
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit({ data }),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent label="코드" content={data?.code} />
            <DescriptionContent
              label="판매상태"
              content={changeSellStatus(data?.sellStatus)}
            />
            <DescriptionContent
              span="12"
              label="색상계열"
              content={
                <StyledSelect
                  optionList={colorCode.data}
                  placeholder={data?.colorCode?.name}
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
                  placeholder={data?.model}
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
                  placeholder={data?.name}
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
                  placeholder={data?.delivery?.desc}
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
              label="배송비"
              content={data?.delivery?.basicFee + "원"}
            />
            <DescriptionContent
              label="무료배송 최소금액"
              content={data?.delivery?.freeCondition + "원"}
            />
            <DescriptionContent label="재고" content={data?.stock} />
            <DescriptionContent label="판매량" content={data?.sellCount} />
            <DescriptionContent
              label="작성일"
              content={changeDays(data?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(data?.updatedAt)}
            />
          </Description>
          <Button type="submit" status="primary" withInput needMarginTop>
            수정
          </Button>
        </StyledForm>
        <Modal
          title="상품 수정"
          msg="상품 수정을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => {
            if (typeof id === "string") {
              navigate(`/goods/groups/detail/${id}`);
            }
          }}
        />
      </GoodsGroupItemDetailBlock>
    </>
  );
};

export default GoodsGroupItemDetail;
