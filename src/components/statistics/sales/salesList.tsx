import styled from "styled-components";
import { BreadCrumb, Responsive, Table, Tabs } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import ReactApexChart from "react-apexcharts";
import { salesDataColumns } from "lib/columns/columnsList";

const yearOptions = {
  chart: {
    id: "num1",
    group: "paper",
  },
  colors: ["#008FFB"],
  xaxis: {
    categories: ["21년", "22년", "23년"],
  },
};

const monthOptions = {
  chart: {
    id: "num2",
    group: "paper",
  },
  colors: ["#faad14"],
  xaxis: {
    categories: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
  },
};

const series1 = [
  {
    name: "연도별 판매량",
    data: [1230, 1550, 1740],
  },
];

const series2 = [
  {
    name: "월별 판매량",
    data: [26, 29, 15, 36, 32, 33, 15, 36, 36, 52, 23, 46],
  },
];

const tabData = [
  {
    title: "연도별",
    data: (
      <ReactApexChart
        options={yearOptions}
        type="line"
        series={series1}
        height={400}
      />
    ),
  },
  {
    title: "월별",
    data: (
      <ReactApexChart
        options={monthOptions}
        type="line"
        series={series2}
        height={400}
      />
    ),
  },
  {
    title: "주별",
  },
];

const SalesListBlock = styled(Responsive)``;

const SalesList = () => {
  return (
    <>
      <SalesListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "매출분석",
                  url: "/statistics/sales",
                },
              ]}
            />
          }
        />
      </SalesListBlock>
      <SalesListBlock>
        <Tabs page={tabData} />
      </SalesListBlock>
      <SalesListBlock>
        <Table
          columns={salesDataColumns}
          // content={salesList}
          url="/order/detail"
          moveKey="id"
          pagenation
          filter
        />
      </SalesListBlock>
    </>
  );
};

export default SalesList;
