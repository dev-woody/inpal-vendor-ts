import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const RefundListBlock = styled(Responsive)``;

type listProps = {
  refundList: response;
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
          content={refundList?.data?.filter(
            (list: any) => list.info.orderStatus === "REFUND_REQUEST"
          )}
          url="/order/refund/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
        />
      </RefundListBlock>
    </>
  );
};

export default RefundList;
