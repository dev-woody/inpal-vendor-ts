import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { useSearchParams } from "react-router-dom";

const BeforeDeliveryBlock = styled(Responsive)``;

type listProps = {
  beforeDelivery: response;
  countOrder: response;
  beforedeliveryColumns: ColumnsType[];
};

// const BeforeDelivery = ({ beforeDelivery }: listProps) => {
const BeforeDelivery = ({
  beforeDelivery,
  countOrder,
  beforedeliveryColumns,
}: listProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const { pageNum, isDesc } = JSON.parse(
    sessionStorage.getItem("deliveryPageInfo") || "{}"
  );
  return (
    <>
      <BeforeDeliveryBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송상태 관리",
                  url: `?pageNum=${pageNum}&isDesc=${isDesc}`,
                },
              ]}
            />
          }
        />
      </BeforeDeliveryBlock>
      <BeforeDeliveryBlock>
        <Table
          columns={beforedeliveryColumns}
          content={beforeDelivery?.data}
          url="/order/beforeDelivery/detail"
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
      </BeforeDeliveryBlock>
    </>
  );
};

export default BeforeDelivery;
