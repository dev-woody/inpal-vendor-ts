import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";

const BeforeDeliveryBlock = styled(Responsive)``;

type listProps = {
  beforeDelivery?: any;
  beforedeliveryColumns: ColumnsType[];
};

// const BeforeDelivery = ({ beforeDelivery }: listProps) => {
const BeforeDelivery = ({
  beforeDelivery,
  beforedeliveryColumns,
}: listProps) => {
  return (
    <>
      <BeforeDeliveryBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송대기 관리",
                  url: "/order/beforeDelivery",
                },
              ]}
            />
          }
        />
      </BeforeDeliveryBlock>
      <BeforeDeliveryBlock>
        <Table
          columns={beforedeliveryColumns}
          // content={beforeDelivery}
          content={beforeDelivery.filter(
            (list: any) => list.orderStatus === "ITEM_READY"
          )}
          url="/order/beforeDelivery/detail"
          moveKey="id"
          pagenation
          filter
        />
      </BeforeDeliveryBlock>
    </>
  );
};

export default BeforeDelivery;
