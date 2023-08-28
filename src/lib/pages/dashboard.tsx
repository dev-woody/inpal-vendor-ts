import { supOptions } from "lib/columns/chartColumns";
import { Responsive, Table } from "lib/styles";
import ReactApexCharts from "react-apexcharts";
import PageHeader from "./pageHeader";
import styled from "styled-components";
import { dailySalesColumns } from "lib/columns/columnsList";
import { testDashBoardData } from "types/data.test";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "reducers/reducerHooks";
import { useEffect } from "react";
import { vendorOrderActions } from "reducers/order/vendorOrder";

const DashboardBlock = styled(Responsive)``;

const OrderListBox = styled.div`
  flex-grow: 1;
  & + & {
    border-left: 1px solid rgba(0, 0, 0, 0.06);
  }
`;

const TitleBox = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  background-color: #fafafa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;
const OrderBox = styled.div`
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  &:hover {
    cursor: pointer;
    > span {
      color: #faad14;
      border-bottom-color: #faad14 !important;
    }
  }
`;

const Dashboard = () => {
  const { user, findAll } = useAppSelector((store) => ({
    user: store.user,
    findAll: store.vendorOrder.itemFindAll.data,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      vendorOrderActions.itemFindAll({ vendorId: user.vendorId, isDesc: false })
    );
  }, []);

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

  const statusLength = [
    {
      name: "무통장입금",
      length: findAll?.filter(
        (status: any) => status?.info?.orderStatus === "PAYMENT_WAIT"
      ),
      onClick: () => {
        navigate(`/order/beforePayment`);
      },
    },
    {
      name: "결제완료",
      length: findAll?.filter(
        (status: any) => status?.info?.orderStatus === "PAYMENT_COMPLETE"
      ),
      onClick: () => {
        navigate(`/order/paymentComplete`);
      },
    },
    {
      name: "배송대기중",
      length: findAll?.filter(
        (status: any) => status?.info?.orderStatus === "ITEM_READY"
      ),
      onClick: () => {
        navigate(`/order/beforeDelivery`);
      },
    },
    {
      name: "취소요청",
      length: findAll?.filter(
        (status: any) => status?.info?.orderStatus === "CANCEL_REQUEST"
      ),
      onClick: () => {
        navigate(`/order/cancel`);
      },
    },
    {
      name: "반품요청",
      length: findAll?.filter(
        (status: any) => status?.info?.orderStatus === "RETURN_REQUEST"
      ),
      onClick: () => {
        navigate(`/order/return`);
      },
    },
    {
      name: "교환요청",
      length: findAll?.filter(
        (status: any) => status?.info?.orderStatus === "EXCHANGE_REQUEST"
      ),
      onClick: () => {
        navigate(`/order/exchange`);
      },
    },
    {
      name: "환불요청",
      length: findAll?.filter(
        (status: any) => status?.info?.orderStatus === "REFUND_REQUEST"
      ),
      onClick: () => {
        navigate(`/order/refund`);
      },
    },
    {
      name: "구매확정",
      length: findAll?.filter(
        (status: any) => status?.info?.orderStatus === "CONFIRM"
      ),
      onClick: () => {
        navigate(`/order/confirmation`);
      },
    },
  ];

  return (
    <>
      <DashboardBlock>
        <PageHeader title="주문현황" />
        <div
          style={{
            display: "flex",
            width: "100%",
            border: "1px solid rgba(0, 0, 0, 0.06)",
          }}
        >
          {statusLength.map((orders: any, index: number) => {
            return (
              <OrderListBox key={index} style={{ flexGrow: "1" }}>
                <TitleBox>{orders.name}</TitleBox>
                <OrderBox onClick={orders.onClick}>
                  <span
                    style={{
                      padding: "0 0.25rem",
                      borderBottom: "1px solid black",
                    }}
                  >
                    {orders?.length?.length}
                  </span>
                </OrderBox>
              </OrderListBox>
            );
          })}
        </div>
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
