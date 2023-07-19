import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { salesColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const SalesListBlock = styled(Responsive)``;

type listProps = {
  salesList?: response;
};

// const SalesList = ({ salesList }: listProps) => {
const SalesList = ({ salesList }: listProps) => {
  return (
    <>
      <SalesListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "환불관리",
                  url: "/order/sales",
                },
              ]}
            />
          }
        />
      </SalesListBlock>
      <SalesListBlock>
        <Table
          columns={salesColumns}
          // content={salesList}
          url="/order/detail"
          moveKey="id"
          pagenation
          filter
        />
      </SalesListBlock>
    </>
  );
};

export default SalesList;
