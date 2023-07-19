import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";

const ReturnListBlock = styled(Responsive)``;

type listProps = {
  returnList?: any;
  returnOrderColumns: ColumnsType[];
};

const ReturnList = ({ returnList, returnOrderColumns }: listProps) => {
  return (
    <>
      <ReturnListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "반품관리",
                  url: "/order/return",
                },
              ]}
            />
          }
        />
      </ReturnListBlock>
      <ReturnListBlock>
        <Table
          columns={returnOrderColumns}
          // content={returnList}
          content={returnList.filter(
            (list: any) => list.orderStatus === "RETURN_REQUEST"
          )}
          url="/order/return/detail"
          moveKey="id"
          pagenation
          filter
        />
      </ReturnListBlock>
    </>
  );
};

export default ReturnList;
