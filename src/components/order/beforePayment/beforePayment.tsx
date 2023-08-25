import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType, vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { NavigateFunction, useSearchParams } from "react-router-dom";

const BeforePaymentBlock = styled(Responsive)``;

type listProps = {
  beforePayment: response;
  countOrder: response;
  beforePaymentColumns: ColumnsType[];
};

const BeforePayment = ({
  beforePayment,
  countOrder,
  beforePaymentColumns,
}: listProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("orderPageInfo") || "{}"
  );
  return (
    <>
      <BeforePaymentBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "무통장입금 현황",
                  url: `?pageNum=${pageNum}&isDesc=${isDesc}`,
                },
              ]}
            />
          }
        />
      </BeforePaymentBlock>
      <BeforePaymentBlock>
        <Table
          columns={vendorOrderColumns}
          content={beforePayment?.data}
          url="/order/beforePayment/detail"
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
      </BeforePaymentBlock>
    </>
  );
};

export default BeforePayment;
