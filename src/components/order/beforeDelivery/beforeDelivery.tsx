import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const BeforeDeliveryBlock = styled(Responsive)``;

type listProps = {
  beforeDelivery: response;
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
                  name: "배송상태 관리",
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
          content={beforeDelivery?.data}
          // content={beforeDelivery?.data?.filter(
          //   (list: any) =>
          //     list?.info?.orderItems
          //       .map((itemList: any) => itemList.info?.orderStatus)
          //       .includes("ITEM_READY") ||
          //     list?.info?.orderItems
          //       .map((itemList: any) => itemList.info?.orderStatus)
          //       .includes("DELIVERY_START") ||
          //     list?.info?.orderItems
          //       .map((itemList: any) => itemList.info?.orderStatus)
          //       .includes("DELIVERY_END")
          // )}
          url="/order/beforeDelivery/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
        />
      </BeforeDeliveryBlock>
    </>
  );
};

export default BeforeDelivery;
