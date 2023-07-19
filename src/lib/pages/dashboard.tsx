import { mainOptions, supOptions } from "lib/columns/chartColumns";
import { Responsive, ResponsiveFlex, Table } from "lib/styles";
import ReactApexCharts from "react-apexcharts";
import PageHeader from "./pageHeader";
import styled from "styled-components";
import { dailySalesColumns, todoColumns } from "lib/columns/columnsList";
import { testDashBoardData, testDashBoardOrderData } from "types/data.test";

const DashboardBlock = styled(Responsive)``;

const Dashboard = () => {
  const series1 = [
    {
      name: "전체 판매량",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 99, 101, 91, 87],
    },
  ];

  const series2 = [
    {
      name: "상품1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "상품2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: "상품3",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  return (
    <>
      <DashboardBlock>
        <PageHeader title="주문현황" />
        <Table
          columns={todoColumns}
          content={testDashBoardOrderData}
          doNoting={true}
        />
      </DashboardBlock>
      <DashboardBlock>
        <PageHeader title="쇼핑몰현황" />
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1", padding: "0.5rem" }}>
            <ReactApexCharts
              type="area"
              options={supOptions}
              series={series2}
            />
          </div>
          <div style={{ width: "30%", padding: "0.5rem" }}>
            <Table
              columns={dailySalesColumns}
              content={testDashBoardData}
              doNoting={true}
            />
          </div>
        </div>
      </DashboardBlock>
    </>
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //   }}
    // >
    //   <ResponsiveFlex style={{ marginTop: "0", display: "flex" }}>
    //     <Responsive>
    //       <PageHeader title="1년 매출금액" />
    //       <div
    //         style={{
    //           padding: "0.5rem 0.75rem",
    //           margin: "0",
    //           fontSize: "1.25rem",
    //         }}
    //       >
    //         235,120,100원
    //       </div>
    //     </Responsive>
    //     <Responsive style={{ marginTop: "0" }}>
    //       <PageHeader title="2월 매출금액" />
    //       <div
    //         style={{
    //           padding: "0.5rem 0.75rem",
    //           margin: "0",
    //           fontSize: "1.25rem",
    //         }}
    //       >
    //         19,203,080원
    //       </div>
    //     </Responsive>
    //     <div style={{ minWidth: "33%", maxWidth: "33%" }}>
    //       <Responsive>
    //         <PageHeader title="금일 방문자 수" subTitle={"300명"} />
    //       </Responsive>
    //       <Responsive style={{ marginLeft: "0" }}>
    //         <PageHeader title="잔여 판매대금" subTitle={"2건"} />
    //       </Responsive>
    //     </div>
    //   </ResponsiveFlex>
    //   <ResponsiveFlex style={{ display: "flex" }}>
    //     <Responsive>
    //       <PageHeader title="월별 매출금액" />
    //       <ApexCharts type="bar" options={mainOptions} series={series1} />
    //     </Responsive>
    //     <Responsive style={{ minWidth: "33%", maxWidth: "33%" }}>
    //       <PageHeader title="기업별 매출 순위" />
    //       <ApexCharts type="area" options={supOptions} series={series2} />
    //     </Responsive>
    //   </ResponsiveFlex>
    // </div>
  );
};

export default Dashboard;
