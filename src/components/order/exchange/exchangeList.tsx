import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType, vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { useSearchParams } from "react-router-dom";

const ExchangeListBlock = styled(Responsive)``;

type listProps = {
  exchangeList: response;
  countOrder: response;
};

const ExchangeList = ({ exchangeList, countOrder }: listProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("orderPageInfo") || "{}"
  );
  return (
    <>
      <ExchangeListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "교환관리",
                  url: `?pageNum=${pageNum}&isDesc=${isDesc}`,
                },
              ]}
            />
          }
        />
      </ExchangeListBlock>
      <ExchangeListBlock>
        <Table
          columns={vendorOrderColumns}
          content={exchangeList?.data}
          url="/order/exchange/detail"
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
      </ExchangeListBlock>
    </>
  );
};

export default ExchangeList;
