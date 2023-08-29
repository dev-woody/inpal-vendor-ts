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
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const { n, d } = JSON.parse(sessionStorage.getItem("orderPageInfo") || "{}");
  return (
    <>
      <CancelListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "취소관리",
                  url: `?n=${n}&d=${d}`,
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
              n: btoa(String(newPageNum + page)),
              d: d,
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
