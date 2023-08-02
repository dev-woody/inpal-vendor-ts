import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import styled from "styled-components";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { testVendorOrderData } from "types/data.test";
import {
  changeDays,
  changeDeliveryStatus,
  changePhone,
} from "lib/functions/changeInput";
import { vendorOrderItemColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const OrderDetailBlock = styled(Responsive)``;

type orderDetailProps = {
  orderInfo: response;
};

// const OrderDetail = ({ data }: orderDetailProps) => {
const OrderDetail = ({ orderInfo }: orderDetailProps) => {
  const data = orderInfo?.data?.info;
  return (
    <Fragment>
      <OrderDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "주문 조회 /",
                  url: "/order/allList",
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
        <PageHeader title="주문상세정보" />
        <Description>
          <DescriptionContent label="코드" content={data?.code} />
          <DescriptionContent
            label="주문상태"
            content={changeDeliveryStatus(data?.orderStatus)}
          />
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
            content={data?.priceNum?.info?.price + "원"}
          />
          <DescriptionContent
            label="할인가"
            content={data?.priceNum?.info?.salePrice + "원"}
          />
          <DescriptionContent
            label="배송료"
            content={
              data?.priceNum?.info?.specNum?.info?.spec?.info?.delivery?.info
                ?.basicFee + "원"
            }
          />
          <DescriptionContent
            label="무료배송조건"
            content={
              data?.priceNum?.info?.specNum?.info?.spec?.info?.delivery?.info
                ?.freeCondition + "원 이상"
            }
          />
          <DescriptionContent
            label="상품사양"
            content={
              data?.priceNum?.info?.specNum?.info?.spec?.info?.quantity +
              data?.priceNum?.info?.specNum?.info?.spec?.info?.unit?.info
                ?.nameEn +
              "(" +
              data?.priceNum?.info?.specNum?.info?.spec?.info?.unit?.info
                ?.nameKr +
              ")"
            }
          />
          <DescriptionContent
            label="결제금액"
            content={data?.payAmount + "원"}
          />
          <DescriptionContent
            label="결제총액"
            content={data?.payTotal + "원"}
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
          {/* <DescriptionContent
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
      </OrderDetailBlock>
      <OrderDetailBlock>
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
          /> */}
        </Description>
        {/* <Table
          columns={vendorOrderItemColumns}
          content={data?.dealerOrderItem?.itemOptions}
          doNoting
        /> */}
      </OrderDetailBlock>
    </Fragment>
  );
};

export default OrderDetail;
