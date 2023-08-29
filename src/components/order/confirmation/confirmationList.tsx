import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType, vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { useSearchParams } from "react-router-dom";

const ConfirmationListBlock = styled(Responsive)``;

type listProps = {
  confirmationList: response;
  countOrder: response;
};

const ConfirmationList = ({ confirmationList, countOrder }: listProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const { n, d } = JSON.parse(sessionStorage.getItem("orderPageInfo") || "{}");
  return (
    <>
      <ConfirmationListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송관리",
                  url: `?n=${n}&d=${d}`,
                },
              ]}
            />
          }
        />
      </ConfirmationListBlock>
      <ConfirmationListBlock>
        <Table
          columns={vendorOrderColumns}
          content={confirmationList?.data}
          url="/order/confirmation/detail"
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
      </ConfirmationListBlock>
    </>
  );
};

export default ConfirmationList;
