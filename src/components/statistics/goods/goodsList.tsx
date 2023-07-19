import styled from "styled-components";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import ReactApexChart from "react-apexcharts";
import { goodsDataColumns } from "lib/columns/columnsList";

const pieOptions = {
  labels: ["벽지", "페인트", "바닥재", "필름", "몰딩"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

const pieSeries = [44, 55, 13, 43, 22];

const GoodsListBlock = styled(Responsive)``;

const GoodsList = () => {
  return (
    <>
      <GoodsListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품분석",
                  url: "/statistics/goods",
                },
              ]}
            />
          }
        />
      </GoodsListBlock>
      <GoodsListBlock>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <PageHeader title="판매수량" />
            <ReactApexChart
              options={pieOptions}
              type="donut"
              series={pieSeries}
              height={400}
            />
          </div>
          <div style={{ width: "50%" }}>
            <PageHeader title="판매합계" />
            <ReactApexChart
              options={pieOptions}
              type="donut"
              series={pieSeries}
              height={400}
            />
          </div>
        </div>
      </GoodsListBlock>
      <GoodsListBlock>
        <Table
          columns={goodsDataColumns}
          // content={goodsList}
          url="/order/detail"
          moveKey="id"
          pagenation
          filter
        />
      </GoodsListBlock>
    </>
  );
};

export default GoodsList;
