import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType, vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const AfterDeliveryBlock = styled(Responsive)``;

type listProps = {
  afterDelivery: response;
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
          columns={vendorOrderColumns}
          // content={afterDelivery}
          content={afterDelivery?.data?.filter(
            (list: any) => list.info.orderStatus === "DELIVERY_END"
          )}
          url="/order/afterDelivery/detail"
          moveKey={["base", "id"]}
          pagenation
          // filter
        />
      </AfterDeliveryBlock>
    </>
  );
};

export default AfterDelivery;
