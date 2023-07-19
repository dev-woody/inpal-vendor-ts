import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";

const RefundListBlock = styled(Responsive)``;

type listProps = {
  refundList?: any;
  refundOrderColumns: ColumnsType[];
};

// const RefundList = ({ refundList }: listProps) => {
const RefundList = ({ refundList, refundOrderColumns }: listProps) => {
  return (
    <>
      <RefundListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "환불관리",
                  url: "/order/refund",
                },
              ]}
            />
          }
        />
      </RefundListBlock>
      <RefundListBlock>
        <Table
          columns={refundOrderColumns}
          // content={refundList}
          content={refundList.filter(
            (list: any) => list.orderStatus === "REFUND_REQUEST"
          )}
          url="/order/refund/detail"
          moveKey="id"
          pagenation
          filter
        />
      </RefundListBlock>
    </>
  );
};

export default RefundList;
