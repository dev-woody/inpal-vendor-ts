import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import {
  BreadCrumb,
  Button,
  ErrorMsg,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
  Table,
} from "lib/styles";
import styled from "styled-components";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { vendorOrderItemColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { NavigateFunction, useSearchParams } from "react-router-dom";

const BeforeDeliveryDetailBlock = styled(Responsive)``;

type orderDetailProps = {
  orderDetail: response;
  setStatusResult: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const schema = yup.object({
  deliveryCompany: yup.string().required("택배사를 입력해주세요."),
  deliveryNum: yup.string().required("송장번호를 입력해주세요"),
  description: yup.string().required("메모를 입력해주세요."),
});

const BeforeDeliveryDetail = ({
  orderDetail,
  setStatusResult,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
}: orderDetailProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      deliveryCompany: "",
      deliveryNum: "",
      description: "",
    },
  });
  const data = orderDetail.data;

  const isDelevery = data?.info?.orderItems.map((item: any) => {
    return item.orderStatus === "ITEM_READY";
  });

  const { n, d, s } = JSON.parse(
    sessionStorage.getItem("deliveryPageInfo") || "{}"
  );
  return (
    <Fragment>
      <BeforeDeliveryDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송상태 관리 /",
                  url: `/order/beforeDelivery?n=${n}&d=${d}&s=${s}`,
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </BeforeDeliveryDetailBlock>
      <BeforeDeliveryDetailBlock>
        <PageHeader
          title="배송상품 정보"
          subTitle="배송처리는 모든 아이템이 배송대기중일 경우에 가능합니다."
        />
        <StyledForm
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <Description style={{ marginBottom: "1rem" }}>
            <DescriptionContent label="코드" content={data?.info?.code} />
            <DescriptionContent
              label="주문자명"
              content={data?.info?.clientInfo?.clientName}
            />
            <DescriptionContent
              label="수령인"
              content={data?.info?.address?.info?.application}
            />
            <DescriptionContent
              label="전화번호"
              content={data?.info?.address?.info?.mobile}
            />
            <DescriptionContent
              label="우편번호"
              content={data?.info?.address?.info?.addressInfo?.info?.zipCode}
            />
            <DescriptionContent
              label="상세주소"
              content={
                data?.info?.address?.info?.addressInfo?.info?.basic +
                data?.info?.address?.info?.addressInfo?.info?.detail
              }
            />
            <DescriptionContent
              span="12"
              label="택배사"
              content={
                isDelevery?.includes(false) ? (
                  data?.info?.deliveryCompany
                ) : (
                  <StyledInput
                    align="vertical"
                    placeholder="택배사"
                    label="deliveryCompany"
                    register={register}
                    errors={errors}
                    status={errors.deliveryCompany}
                  />
                )
              }
            />
            <DescriptionContent
              span="12"
              label="송장번호"
              content={
                isDelevery?.includes(false) ? (
                  data?.info?.deliveryNum
                ) : (
                  <StyledInput
                    align="vertical"
                    placeholder="송장번호"
                    label="deliveryNum"
                    register={register}
                    errors={errors}
                    status={errors.deliveryNum}
                  />
                )
              }
            />
            {isDelevery?.includes(false) ? null : (
              <DescriptionContent
                span="12"
                label="메모"
                content={
                  <StyledInput
                    align="vertical"
                    placeholder="메모"
                    label="description"
                    register={register}
                    errors={errors}
                    status={errors.description}
                  />
                }
              />
            )}
          </Description>
          <PageHeader title="아이템 정보" />
          <Table
            columns={vendorOrderItemColumns}
            content={data?.info?.orderItems}
            doNoting
          />
          <ErrorMsg>{setStatusResult.message}</ErrorMsg>
          <div>
            <Button
              type="button"
              needMarginTop
              withInput
              onClick={() =>
                navigate(`/order/beforeDelivery?n=${n}&d=${d}&s=${s}`)
              }
            >
              뒤로가기
            </Button>
            {isDelevery?.includes(false) ? null : (
              <Button
                type="submit"
                status="primary"
                withInput
                needMarginTop
                disabled={isSubmitting}
              >
                배송처리
              </Button>
            )}
          </div>
        </StyledForm>
        <Modal
          title="배송처리"
          msg="배송처리 완료"
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // action={() => navigate(`/admin/cupon`)}
        />
      </BeforeDeliveryDetailBlock>
    </Fragment>
  );
};

export default BeforeDeliveryDetail;
