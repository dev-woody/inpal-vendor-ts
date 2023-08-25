import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { useSearchParams } from "react-router-dom";

const CancelListBlock = styled(Responsive)``;

type listProps = {
  cancelList: response;
  countOrder: response;
};

const CancelList = ({ cancelList, countOrder }: listProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("orderPageInfo") || "{}"
  );
  return (
    <>
      <CancelListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "취소관리",
                  url: `?pageNum=${pageNum}&isDesc=${isDesc}`,
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
          content={cancelList?.data}
          url="/order/cancel/detail"
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
      </CancelListBlock>
    </>
  );
};

export default CancelList;
