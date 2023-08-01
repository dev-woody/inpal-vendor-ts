import {
  changeDeliveryStatus,
  changeDays,
  changePhone,
  changeStatus,
  changeTextCut,
  changeSellStatus,
  predictDelivery,
} from "lib/functions/changeInput";
import { Button } from "lib/styles";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { StyledComponent } from "styled-components";

import {
  FaBalanceScale,
  FaBox,
  FaBoxOpen,
  FaBoxes,
  FaBullhorn,
  FaChartLine,
  FaChartPie,
  FaClipboardList,
  FaCode,
  FaDollarSign,
  FaDollyFlatbed,
  FaDonate,
  FaExchangeAlt,
  FaGift,
  FaHandHoldingUsd,
  FaQuestionCircle,
  FaShippingFast,
  FaUserCheck,
  FaUserTimes,
  FaFileAlt,
} from "react-icons/fa";

type sideListType = {
  icon?: any;
  name: string;
  url: string;
  children?: {
    icon?: any;
    menuName: string;
    url: string;
    disable?: boolean;
  }[];
};

export type ColumnsType = {
  title: string;
  dataIndex: string;
  isCheck?: boolean;
  isDesc?: boolean;
  render?: (data?: any, list?: any) => JSX.Element | string | undefined;
};

//* sidebarList
export const sidebarList: sideListType[] = [
  {
    name: "배송코드",
    url: "/dcode",
    children: [
      {
        icon: <FaCode />,
        menuName: "배송코드 관리",
        url: "/dcode",
      },
    ],
  },
  {
    name: "주문",
    url: "/order",
    children: [
      {
        icon: <FaClipboardList />,
        menuName: "전체주문조회",
        url: "/allList",
        disable: true,
      },
      {
        icon: <FaDonate />,
        menuName: "입금전 관리",
        url: "/beforePayment",
        disable: true,
      },
      {
        icon: <FaDollyFlatbed />,
        menuName: "배송대기 관리",
        url: "/beforeDelivery",
        disable: true,
      },
      {
        icon: <FaShippingFast />,
        menuName: "배송중 조회",
        url: "/delivery",
      },
      {
        icon: <FaUserCheck />,
        menuName: "배송완료 조회",
        url: "/afterDelivery",
      },
      {
        icon: <FaUserTimes />,
        menuName: "취소 관리",
        url: "/cancel",
      },
      {
        icon: <FaBox />,
        menuName: "반품 관리",
        url: "/return",
      },
      {
        icon: <FaExchangeAlt />,
        menuName: "교환 관리",
        url: "/exchange",
      },
      {
        icon: <FaHandHoldingUsd />,
        menuName: "환불 관리",
        url: "/refund",
      },
      {
        icon: <FaBoxOpen />,
        menuName: "구매확정",
        url: "/confirmation",
      },
    ],
  },
  {
    name: "상품",
    url: "/goods",
    children: [
      {
        icon: <FaFileAlt />,
        menuName: "상품사양관리",
        url: "/spec",
      },
      {
        icon: <FaBoxes />,
        menuName: "상품그룹관리",
        url: "/groups",
      },
    ],
  },
  {
    name: "프로모션",
    url: "/promotion",
    children: [
      {
        icon: <FaGift />,
        menuName: "이벤트 관리",
        url: "/event",
        disable: true,
      },
    ],
  },
  {
    name: "통계",
    url: "/statistics",
    children: [
      {
        icon: <FaChartLine />,
        menuName: "매출분석",
        url: "/sales",
        disable: true,
      },
      {
        icon: <FaChartPie />,
        menuName: "상품분석",
        url: "/goods",
        disable: true,
      },
    ],
  },
  {
    name: "정산",
    url: "/payment",
    children: [
      {
        icon: <FaBalanceScale />,
        menuName: "정산내역",
        url: "/calculate",
        disable: true,
      },
      {
        icon: <FaDollarSign />,
        menuName: "매출현황",
        url: "/sales",
        disable: true,
      },
    ],
  },
  {
    name: "공지/FAQ",
    url: "/notice",
    children: [
      {
        icon: <FaBullhorn />,
        menuName: "공지사항 관리",
        url: "/announcement",
        disable: true,
      },
      {
        icon: <FaQuestionCircle />,
        menuName: "FAQ 관리",
        url: "/faq",
        disable: true,
      },
    ],
  },
];

export const masterAllListColumns = [
  {
    title: "아이디",
    dataIndex: "info",
    render: (info: any) => info.signInfo.userId,
  },
  {
    title: "이름",
    dataIndex: "info",
    render: (info: any) => info.name,
  },
  {
    title: "이메일",
    dataIndex: "info",
    render: (info: any) => info.email,
  },
  {
    title: "휴대폰",
    dataIndex: "info",
    render: (info: any) => changePhone(info.phone),
  },
  {
    title: "생성일",
    dataIndex: "base",
    render: (base: any) => changeDays(base.createdAt),
  },
  {
    title: "수정일",
    dataIndex: "base",
    render: (base: any) => changeDays(base.updatedAt),
  },
  {
    title: "권한",
    dataIndex: "info",
    render: (info: any) => (info.isTopLevel ? "최고권한" : "하위권한"),
  },
];

//* todo list
export const todoColumns: ColumnsType[] = [
  {
    title: "입금전",
    dataIndex: "beforePayment",
  },
  {
    title: "배송대기",
    dataIndex: "beforeDelivery",
  },
  {
    title: "배송중",
    dataIndex: "delivery",
  },
  {
    title: "배송완료",
    dataIndex: "afterDelivery",
  },
  {
    title: "취소요청",
    dataIndex: "cancel",
  },
  {
    title: "반품요청",
    dataIndex: "return",
  },
  {
    title: "교환요청",
    dataIndex: "exchange",
  },
  {
    title: "환불요청",
    dataIndex: "refund",
  },
  {
    title: "구매확정",
    dataIndex: "confirm",
  },
];

//* dailySales
export const dailySalesColumns: ColumnsType[] = [
  {
    title: "날짜",
    dataIndex: "date",
    render: (date: string) => changeDays(date),
  },
  {
    title: "주문",
    dataIndex: "order",
  },
  {
    title: "결제",
    dataIndex: "payment",
  },
  {
    title: "환불(취소/반품)",
    dataIndex: "exception",
  },
];

//* deliveryCode
export const deliveryCodeColumns: ColumnsType[] = [
  {
    title: "코드",
    dataIndex: "info",
    render: (info) => info.code,
  },
  {
    title: "배송료",
    dataIndex: "info",
    render: (info) => info.basicFee,
  },
  {
    title: "무료배송조건",
    dataIndex: "info",
    render: (info) => info.freeCondition,
  },
  {
    title: "생성일",
    dataIndex: "base",
    isDesc: true,
    render: (base) => changeDays(base.createdAt),
  },
  {
    title: "수정일",
    dataIndex: "base",
    isDesc: true,
    render: (base) => changeDays(base.updatedAt),
  },
];

//* vendorOrder
export const vendorOrderColumns = [
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "주문시간",
    dataIndex: "paymentAt",
    render: (paymentAt: string) => changeDays(paymentAt),
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    isDesc: true,
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    isDesc: true,
    render: (updatedAt: string) => changeDays(updatedAt),
  },
  {
    title: "주문금액",
    dataIndex: "dealerOrderItem",
    isDesc: true,
    render: (dealerOrderItem: any) => dealerOrderItem?.countedTotalPrice + "원",
  },
  {
    title: "송장번호",
    dataIndex: "deliveryNum",
  },
  // {
  //   title: "배송 예정일",
  //   dataIndex: "paymentAt",
  //   render: (paymentAt: string, _: any) => predictDelivery(paymentAt),
  // },
  {
    title: "주문상태",
    dataIndex: "orderStatus",
    render: (orderStatus: string) => changeDeliveryStatus(orderStatus),
  },
];

export const calculateColumns = [
  {
    title: "년",
    dataIndex: "year",
  },
  {
    title: "월",
    dataIndex: "month",
  },
  {
    title: "차수",
    dataIndex: "degree",
  },
  {
    title: "정산금액",
    dataIndex: "paymentFee",
  },
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "상품판매가",
    dataIndex: "goodsPrice",
  },
  {
    title: "배송비",
    dataIndex: "deliveryFee",
  },
  {
    title: "수수료",
    dataIndex: "charge",
  },
  {
    title: "수기정산",
    dataIndex: "manualSettlement",
  },
  {
    title: "정산예정일",
    dataIndex: "ScheduledDate",
  },
  {
    title: "지불상태",
    dataIndex: "paymentStatus",
  },
];

export const salesColumns = [
  {
    title: "결제월",
    dataIndex: "paymentMonth",
  },
  {
    title: "카드발행매출",
    dataIndex: "card",
  },
  {
    title: "현금영수증발행매출",
    dataIndex: "cash",
  },
  {
    title: "기타",
    dataIndex: "etc",
  },
  {
    title: "합계",
    dataIndex: "total",
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    render: (updatedAt: string) => changeDays(updatedAt),
  },
];

//* announcement
export const announcementColumns = [
  {
    title: "번호",
    dataIndex: "num",
  },
  {
    title: "제목",
    dataIndex: "title",
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    render: (updatedAt: string) => changeDays(updatedAt),
  },
];

//* FAQ
export const FAQColumns = [
  {
    title: "번호",
    dataIndex: "num",
  },
  {
    title: "질문",
    dataIndex: "title",
  },
  {
    title: "답변",
    dataIndex: "ansewr",
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    render: (updatedAt: string) => changeDays(updatedAt),
  },
];

//* event
export const eventColumns = [
  {
    title: "번호",
    dataIndex: "num",
  },
  {
    title: "제목",
    dataIndex: "title",
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    render: (updatedAt: string) => changeDays(updatedAt),
  },
];

//* vendorOrderColumns
export const vendorOrderItemColumns = [
  {
    title: "옵션명",
    dataIndex: "goodsGroupOption",
    render: (goodsGroupOption: any) => goodsGroupOption.name,
  },
  {
    title: "사양",
    dataIndex: "goodsGroupOption",
    render: (goodsGroupOption: any) => goodsGroupOption.spec,
  },
  {
    title: "가격",
    dataIndex: "goodsGroupOption",
    render: (goodsGroupOption: any) => goodsGroupOption.price,
  },
];

export const salesDataColumns = [
  {
    title: "순위",
    dataIndex: "rank",
  },
  {
    title: "주문수",
    dataIndex: "orderNum",
  },
  {
    title: "결제합계",
    dataIndex: "salesSum",
  },
  {
    title: "환불합계",
    dataIndex: "refundSum",
  },
  {
    title: "순매출",
    dataIndex: "netSales",
  },
];

export const goodsDataColumns = [
  {
    title: "순위",
    dataIndex: "rank",
  },
  {
    title: "상품코드",
    dataIndex: "code",
  },
  {
    title: "상품명",
    dataIndex: "name",
  },
  {
    title: "판매가",
    dataIndex: "price",
  },
  {
    title: "재고",
    dataIndex: "stock",
  },
  {
    title: "결제수량",
    dataIndex: "paymentCount",
  },
  {
    title: "환불수량",
    dataIndex: "refundCount",
  },
  {
    title: "판매수량",
    dataIndex: "salesCount",
  },
  {
    title: "판매합계",
    dataIndex: "salesSum",
  },
];
