import React from "react";
import ReactECharts from "echarts-for-react";
import { CategoryData } from "../types/dashboard.types";

interface Props {
  data: CategoryData[];
}

const SalesByCategoryChart: React.FC<Props> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: 0,
    },
    series: [
      {
        name: "Sales",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 350 }} />;
};

export default SalesByCategoryChart;
