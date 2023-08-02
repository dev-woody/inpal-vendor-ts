import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const PaymentCompleteListBlock = styled(Responsive)``;

type listProps = {
  paymentComplete: response;
  paymentCompleteOrderColumns: ColumnsType[];
};

const PaymentCompleteList = ({
  paymentComplete,
  paymentCompleteOrderColumns,
}: listProps) => {
  return (
    <>
      <PaymentCompleteListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품준비중",
                  url: "/order/paymentComplete",
                },
              ]}
            />
          }
        />
      </PaymentCompleteListBlock>
      <PaymentCompleteListBlock>
        <Table
          columns={paymentCompleteOrderColumns}
          // content={paymentcompleteList}
          content={paymentComplete?.data?.filter(
            (list: any) => list?.info?.orderStatus === "PAYMENT_COMPLETE"
          )}
          //! 원상복구해야함
          url="/order/allList/detail"
          // url="/order/paymentComplete/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
        />
      </PaymentCompleteListBlock>
    </>
  );
};

export default PaymentCompleteList;
