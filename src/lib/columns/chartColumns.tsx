import { ApexOptions } from "apexcharts";

export const mainOptions = {
  chart: {
    id: "판매량",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
      columnWidth: "40%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["#faad14"],
  },
  fill: {
    opacity: 0.7,
    colors: ["#faad14"],
  },
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

export const supOptions: ApexOptions = {
  chart: {
    id: "vendor",
    group: "payment",
    stacked: true,
    width: 450,
    height: 350,
  },
  dataLabels: {
    enabled: true,
  },
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
  legend: {
    position: "top",
    horizontalAlign: "left",
  },
};
