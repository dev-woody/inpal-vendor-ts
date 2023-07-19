import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import styled from "styled-components";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { testVendorOrderData } from "types/data.test";
import { changeDays } from "lib/functions/changeInput";
import { vendorOrderItemColumns } from "lib/columns/columnsList";

const BeforeDeliveryDetailBlock = styled(Responsive)``;

type orderDetailProps = {
  orderDetail?: { [key: string]: any };
};

// const BeforeDeliveryDetail = ({ data }: orderDetailProps) => {
const BeforeDeliveryDetail = ({ orderDetail }: orderDetailProps) => {
  const data = testVendorOrderData[0];
  const item = data?.dealerOrderItem;
  return (
    <Fragment>
      <BeforeDeliveryDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송대기 관리 /",
                  url: "/order/beforeDelivery",
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
        <PageHeader title="배송지 정보" />
        <Description>
          <DescriptionContent label="코드" content={data?.code} />
          <DescriptionContent
            label="결제일"
            content={changeDays(data?.paymentAt)}
          />
          <DescriptionContent label="우편번호" content={data?.addr_zipCode} />
          <DescriptionContent
            label="상세주소"
            content={data?.addr_basic + " " + data?.addr_detail}
          />
          <DescriptionContent label="수령인" content={data?.addr_name} />
          <DescriptionContent label="전화번호" content={data?.addr_phone} />
          <DescriptionContent label="예비번호" content={data?.addr_sub_phone} />
          <DescriptionContent label="주문번호" content={data?.deliveryNum} />
          <DescriptionContent label="메모" content={data?.delivery_memo} />
        </Description>
      </BeforeDeliveryDetailBlock>
      <BeforeDeliveryDetailBlock>
        <PageHeader title="상품 정보" />
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent label="코드" content={item.goodsItem?.code} />
          <DescriptionContent
            label="색상정보"
            content={item.goodsItem?.colorKind}
          />
          <DescriptionContent label="모델명" content={item.goodsItem?.model} />
          <DescriptionContent label="이름" content={item.goodsItem?.name} />
          <DescriptionContent label="사양" content={item.goodsItem?.spec} />
          <DescriptionContent label="주문수량" content={item.goodsItemCount} />
          <DescriptionContent label="금액" content={item.countedPrice} />
          <DescriptionContent
            label="할인 후 금액"
            content={item.countedSalePrice}
          />
          <DescriptionContent
            label="할인가"
            content={item.countedSaleDifferencePrice}
          />
          <DescriptionContent label="옵션가" content={item.optionPrice} />
          <DescriptionContent
            label="배송료"
            content={item.countedDeliveryFee}
          />
          <DescriptionContent label="적립 포인트" content={item.countedPoint} />
          <DescriptionContent
            label="전체주문금액"
            content={item.countedTotalPrice}
          />
        </Description>
        <Table
          columns={vendorOrderItemColumns}
          content={data?.dealerOrderItem?.itemOptions}
          doNoting
        />
      </BeforeDeliveryDetailBlock>
    </Fragment>
  );
};

export default BeforeDeliveryDetail;
