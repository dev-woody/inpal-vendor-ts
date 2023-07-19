import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { calculateColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const CalculateListBlock = styled(Responsive)``;

type listProps = {
  calculateList?: response;
};

// const CalculateList = ({ calculateList }: listProps) => {
const CalculateList = ({ calculateList }: listProps) => {
  return (
    <>
      <CalculateListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "환불관리",
                  url: "/order/calculate",
                },
              ]}
            />
          }
        />
      </CalculateListBlock>
      <CalculateListBlock>
        <Table
          columns={calculateColumns}
          // content={calculateList}
          url="/order/detail"
          moveKey="id"
          pagenation
          filter
        />
      </CalculateListBlock>
    </>
  );
};

export default CalculateList;
