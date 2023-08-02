import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const OrderListBlock = styled(Responsive)``;

type listProps = {
  orderList: response;
};

const OrderList = ({ orderList }: listProps) => {
  return (
    <>
      <OrderListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "주문 조회",
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
          content={orderList.data}
          url="/order/allList/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
        />
      </OrderListBlock>
    </>
  );
};

export default OrderList;
