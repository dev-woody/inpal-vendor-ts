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
  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("orderPageInfo") || "{}"
  );
  return (
    <>
      <ConfirmationListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송관리",
                  url: `?pageNum=${pageNum}&isDesc=${isDesc}`,
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
              pageNum: String(newPageNum + page),
              isDesc: isDesc,
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
