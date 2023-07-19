import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";

const ExchangeListBlock = styled(Responsive)``;

type listProps = {
  exchangeList?: any;
  exchangeOrderColumns: ColumnsType[];
};

const ExchangeList = ({ exchangeList, exchangeOrderColumns }: listProps) => {
  return (
    <>
      <ExchangeListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "교환관리",
                  url: "/order/exchange",
                },
              ]}
            />
          }
        />
      </ExchangeListBlock>
      <ExchangeListBlock>
        <Table
          columns={exchangeOrderColumns}
          // content={exchangeList}
          content={exchangeList.filter(
            (list: any) => list.orderStatus === "EXCHANGE_REQUEST"
          )}
          url="/order/exchange/detail"
          moveKey="id"
          pagenation
          filter
        />
      </ExchangeListBlock>
    </>
  );
};

export default ExchangeList;
