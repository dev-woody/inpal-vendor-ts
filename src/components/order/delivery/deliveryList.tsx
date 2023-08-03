import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType, vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const DeliveryListBlock = styled(Responsive)``;

type listProps = {
  deliveryList: response;
  deliveryColumns: ColumnsType[];
};

// const DeliveryList = ({ deliveryList }: listProps) => {
const DeliveryList = ({ deliveryList, deliveryColumns }: listProps) => {
  return (
    <>
      <DeliveryListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송관리",
                  url: "/order/delivery",
                },
              ]}
            />
          }
        />
      </DeliveryListBlock>
      <DeliveryListBlock>
        <Table
          columns={vendorOrderColumns}
          // content={deliveryList}
          content={deliveryList?.data?.filter(
            (list: any) => list.info.orderStatus === "DELIVERY_START"
          )}
          url="/order/delivery/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
        />
      </DeliveryListBlock>
    </>
  );
};

export default DeliveryList;
