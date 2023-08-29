import styled from "styled-components";
import { BreadCrumb, Responsive, StyledSelect, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { useSearchParams } from "react-router-dom";

const BeforeDeliveryBlock = styled(Responsive)``;

type listProps = {
  beforeDelivery: response;
  countOrder: response;
  beforedeliveryColumns: ColumnsType[];
  onSelect: (status: string) => void;
};

// const BeforeDelivery = ({ beforeDelivery }: listProps) => {
const BeforeDelivery = ({
  beforeDelivery,
  countOrder,
  beforedeliveryColumns,
  onSelect,
}: listProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const { n, d, s } = JSON.parse(
    sessionStorage.getItem("deliveryPageInfo") || "{}"
  );

  const statusColumns = [
    {
      name: "전체조회",
      id: "all",
    },
    {
      name: "배송전",
      id: "not_yet",
    },
    {
      name: "배송후",
      id: "delivery",
    },
  ];
  return (
    <>
      <BeforeDeliveryBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송상태 관리",
                  url: `?n=${n}&d=${d}&s=${s}`,
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
              n: btoa(String(newPageNum + page)),
              d: d,
              s: s,
            })
          }
          moveKey={["base", "id"]}
          pagenation
          pageCount={countOrder.data}
          filter
          filterInput={
            <StyledSelect
              placeholder="배송 상태"
              optionList={statusColumns}
              actions={onSelect}
            />
          }
        />
      </BeforeDeliveryBlock>
    </>
  );
};

export default BeforeDelivery;
