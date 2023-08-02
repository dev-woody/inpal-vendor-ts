import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const ConfirmationListBlock = styled(Responsive)``;

type listProps = {
  confirmationList: response;
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
          content={confirmationList?.data?.filter(
            (list: any) => list.info.orderStatus === "CONFIRM"
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
