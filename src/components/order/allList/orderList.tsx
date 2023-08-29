import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { vendorOrderColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { useSearchParams } from "react-router-dom";

const OrderListBlock = styled(Responsive)``;

type listProps = {
  orderList: response;
  countOrder: response;
};

const OrderList = ({ orderList, countOrder }: listProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const { n, d } = JSON.parse(sessionStorage.getItem("orderPageInfo") || "{}");
  return (
    <>
      <OrderListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "주문 조회",
                  url: `?n=${n}&d=${d}`,
                },
              ]}
            />
          }
        />
      </OrderListBlock>
      <OrderListBlock>
        <Table
          columns={vendorOrderColumns}
          content={orderList.data}
          url="/order/allList/detail"
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
      </OrderListBlock>
    </>
  );
};

export default OrderList;
