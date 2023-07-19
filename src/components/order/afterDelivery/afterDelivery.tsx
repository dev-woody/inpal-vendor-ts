import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";

const AfterDeliveryBlock = styled(Responsive)``;

type listProps = {
  afterDelivery?: any;
  afterDeliveryColumns: ColumnsType[];
};

// const AfterDelivery = ({ afterDelivery }: listProps) => {
const AfterDelivery = ({ afterDelivery, afterDeliveryColumns }: listProps) => {
  return (
    <>
      <AfterDeliveryBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송완료 관리",
                  url: "/order/afterDelivery",
                },
              ]}
            />
          }
        />
      </AfterDeliveryBlock>
      <AfterDeliveryBlock>
        <Table
          columns={afterDeliveryColumns}
          // content={afterDelivery}
          content={afterDelivery.filter(
            (list: any) => list.orderStatus === "DELIVERY_END"
          )}
          url="/order/afterDelivery/detail"
          moveKey="id"
          pagenation
          filter
        />
      </AfterDeliveryBlock>
    </>
  );
};

export default AfterDelivery;
