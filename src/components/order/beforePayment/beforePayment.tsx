import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";

const BeforePaymentBlock = styled(Responsive)``;

type listProps = {
  beforePayment?: any;
  beforePaymentColumns: ColumnsType[];
};

// const BeforePayment = ({ beforePayment }: listProps) => {
const BeforePayment = ({ beforePayment, beforePaymentColumns }: listProps) => {
  return (
    <>
      <BeforePaymentBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "입금전 관리",
                  url: "/order/beforePayment",
                },
              ]}
            />
          }
        />
      </BeforePaymentBlock>
      <BeforePaymentBlock>
        <Table
          columns={beforePaymentColumns}
          // content={beforePayment}
          content={beforePayment.filter(
            (list: any) => list.orderStatus === "PAYMENT_WAIT"
          )}
          url="/order/beforePayment/detail"
          moveKey="id"
          pagenation
          filter
        />
      </BeforePaymentBlock>
    </>
  );
};

export default BeforePayment;
