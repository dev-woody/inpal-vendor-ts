import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive, Table } from "lib/styles";
import styled from "styled-components";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import {
  changeDeliveryStatus,
  changeOrderPathStatus,
  changePhone,
  priceToString,
} from "lib/functions/changeInput";
import { response } from "types/globalTypes";
import { NavigateFunction } from "react-router-dom";
import { vendorOrderLogColumns } from "lib/columns/columnsList";

const OrderDetailBlock = styled(Responsive)``;

type orderDetailProps = {
  orderInfo: response;
  orderLog: response;
  navigate: NavigateFunction;
};

const OrderDetail = ({ orderInfo, orderLog, navigate }: orderDetailProps) => {
  const data = orderInfo?.data?.info;
  const path = window.location.pathname.split("/");
  const rollbackPath = "/" + path[1] + "/" + path[2];
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("orderPageInfo") || "{}"
  );

  return (
    <Fragment>
      <OrderDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: `${changeOrderPathStatus(path[2])} /`,
                  url: `/order/${path[2]}?pageNum=${pageNum}&isDesc=${isDesc}`,
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </OrderDetailBlock>
      <OrderDetailBlock>
        <PageHeader title="주문 상세정보" />
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent label="코드" content={data?.code} />
          <DescriptionContent
            label="주문상태"
            content={changeDeliveryStatus(data?.orderStatus)}
          />
        </Description>
        <PageHeader title="상품정보" />
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent
            label="모델명"
            content={data?.item?.info?.basic?.info?.model}
          />
          <DescriptionContent
            label="상품명"
            content={data?.item?.info?.basic?.info?.name}
          />
          <DescriptionContent
            label="색상그룹"
            content={data?.item?.info?.basic?.info?.colorCode?.info?.name}
          />
          <DescriptionContent
            label="색상코드"
            content={data?.item?.info?.basic?.info?.colorCode?.info?.rgb}
          />
          <DescriptionContent
            label="정상가"
            content={priceToString(data?.priceNum?.info?.price) + "원"}
          />
          <DescriptionContent
            label="할인가"
            content={priceToString(data?.priceNum?.info?.salePrice) + "원"}
          />
          <DescriptionContent
            label="배송료"
            content={
              priceToString(
                data?.priceNum?.info?.specNum?.info?.spec?.info?.delivery?.info
                  ?.basicFee
              ) + "원"
            }
          />
          <DescriptionContent
            label="무료배송조건"
            content={
              priceToString(
                data?.priceNum?.info?.specNum?.info?.spec?.info?.delivery?.info
                  ?.freeCondition
              ) + "원 이상"
            }
          />
          <DescriptionContent
            label="상품사양"
            content={
              data?.priceNum?.info?.specNum?.info?.spec?.info?.quantity +
              " " +
              data?.priceNum?.info?.specNum?.info?.spec?.info?.unit?.info
                ?.nameEn +
              "(" +
              data?.priceNum?.info?.specNum?.info?.spec?.info?.unit?.info
                ?.nameKr +
              ")"
            }
          />
        </Description>
        <PageHeader title="주문정보" />
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent
            label="주문자"
            content={data?.clientInfo?.clientName}
          />
          <DescriptionContent
            label="주문자타입"
            content={data?.clientInfo?.clientType}
          />
          <DescriptionContent label="주문수량" content={data?.count + "개"} />
          <DescriptionContent
            label="판매수수료"
            content={data?.masterCharge + "%"}
          />
          <DescriptionContent
            label="결제금액"
            content={priceToString(data?.payAmount) + "원"}
          />
          <DescriptionContent
            label="결제총액"
            content={priceToString(data?.payTotal) + "원"}
          />
          <DescriptionContent
            label="우편번호"
            content={data?.address?.info?.addressInfo?.info?.zipCode}
          />
          <DescriptionContent
            label="상세주소"
            content={
              data?.address?.info?.addressInfo?.info?.basic +
              " " +
              data?.address?.info?.addressInfo?.info?.detail
            }
          />
          <DescriptionContent
            label="전화번호"
            content={changePhone(data?.address?.info?.phone)}
          />
          <DescriptionContent
            label="휴대전화"
            content={changePhone(data?.address?.info?.mobile)}
          />
          <DescriptionContent
            label="수령자"
            content={data?.address?.info?.receiver}
          />
          <DescriptionContent
            label="주문자명"
            content={data?.address?.info?.application}
          />
        </Description>
        <PageHeader title="배송상태 기록" />
        <Table
          columns={vendorOrderLogColumns}
          content={orderLog.data}
          doNothing
        />
        <Button
          onClick={() => navigate(`${rollbackPath}`)}
          type="button"
          withInput
          needMarginTop
        >
          뒤로가기
        </Button>
      </OrderDetailBlock>
    </Fragment>
  );
};

export default OrderDetail;
