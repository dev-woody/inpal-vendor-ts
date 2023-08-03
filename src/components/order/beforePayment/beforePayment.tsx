import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType, vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { NavigateFunction } from "react-router-dom";

const BeforePaymentBlock = styled(Responsive)``;

type listProps = {
  beforePayment: response;
  beforePaymentColumns: ColumnsType[];
};

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
          columns={vendorOrderColumns}
          // content={beforePayment}
          content={beforePayment?.data?.filter(
            (list: any) => list.info.orderStatus === "PAYMENT_WAIT"
          )}
          url="/order/beforePayment/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
        />
      </BeforePaymentBlock>
    </>
  );
};

export default BeforePayment;
