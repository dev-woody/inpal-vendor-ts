import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType, vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { useSearchParams } from "react-router-dom";

const RefundListBlock = styled(Responsive)``;

type listProps = {
  refundList: response;
  countOrder: response;
  refundOrderColumns: ColumnsType[];
};

const RefundList = ({
  refundList,
  countOrder,
  refundOrderColumns,
}: listProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("orderPageInfo") || "{}"
  );
  return (
    <>
      <RefundListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "환불관리",
                  url: `?pageNum=${pageNum}&isDesc=${isDesc}`,
                },
              ]}
            />
          }
        />
      </RefundListBlock>
      <RefundListBlock>
        <Table
          columns={vendorOrderColumns}
          // content={refundList}
          content={refundList?.data}
          url="/order/refund/detail"
          searchParams={searchParams}
          setSearchParams={(page: number) =>
            setSearchParams({
              pageNum: String(newPageNum + page),
              isDesc: isDesc,
            })
          }
          moveKey={["base", "id"]}
          pagenation
          pageCount={countOrder.data}
        />
      </RefundListBlock>
    </>
  );
};

export default RefundList;
