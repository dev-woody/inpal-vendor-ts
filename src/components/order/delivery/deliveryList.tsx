import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";

const DeliveryListBlock = styled(Responsive)``;

type listProps = {
  deliveryList?: any;
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
          columns={deliveryColumns}
          // content={deliveryList}
          content={deliveryList.filter(
            (list: any) => list.orderStatus === "DELIVERY_START"
          )}
          url="/order/delivery/detail"
          moveKey="id"
          pagenation
          filter
        />
      </DeliveryListBlock>
    </>
  );
};

export default DeliveryList;
