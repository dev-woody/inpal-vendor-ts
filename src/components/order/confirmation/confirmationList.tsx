import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";

const ConfirmationListBlock = styled(Responsive)``;

type listProps = {
  confirmationList?: any;
  confirmationColumns: ColumnsType[];
};

// const ConfirmationList = ({ confirmationList }: listProps) => {
const ConfirmationList = ({
  confirmationList,
  confirmationColumns,
}: listProps) => {
  return (
    <>
      <ConfirmationListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송관리",
                  url: "/order/confirmation",
                },
              ]}
            />
          }
        />
      </ConfirmationListBlock>
      <ConfirmationListBlock>
        <Table
          columns={confirmationColumns}
          // content={confirmationList}
          content={confirmationList.filter(
            (list: any) => list.orderStatus === "CONFIRM"
          )}
          url="/order/confirmation/detail"
          moveKey="id"
          pagenation
          filter
        />
      </ConfirmationListBlock>
    </>
  );
};

export default ConfirmationList;
