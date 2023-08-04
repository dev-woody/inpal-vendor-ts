import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType, vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const CancelListBlock = styled(Responsive)``;

type listProps = {
  cancelList: response;
  cancelOrderColumns: ColumnsType[];
};

const CancelList = ({ cancelList, cancelOrderColumns }: listProps) => {
  return (
    <>
      <CancelListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "취소관리",
                  url: "/order/cancel",
                },
              ]}
            />
          }
        />
      </CancelListBlock>
      <CancelListBlock>
        <Table
          columns={vendorOrderColumns}
          // content={cancelList}
          content={cancelList?.data?.filter(
            (list: any) => list.info.orderStatus === "CANCEL_REQUEST"
          )}
          url="/order/cancel/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
        />
      </CancelListBlock>
    </>
  );
};

export default CancelList;
