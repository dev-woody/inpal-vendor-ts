import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { testVendorOrderData } from "types/data.test";

const OrderListBlock = styled(Responsive)``;

type listProps = {
  orderList?: response;
};

// const OrderList = ({ orderList }: listProps) => {
const OrderList = ({ orderList }: listProps) => {
  return (
    <>
      <OrderListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "주문관리",
                  url: "/order/allList",
                },
              ]}
            />
          }
        />
      </OrderListBlock>
      <OrderListBlock>
        <Table
          columns={vendorOrderColumns}
          // content={orderList}
          content={testVendorOrderData}
          url="/order/allList/detail"
          moveKey="id"
          pagenation
          filter
        />
      </OrderListBlock>
    </>
  );
};

export default OrderList;
