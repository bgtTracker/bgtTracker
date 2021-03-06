import React, { Component } from "react";
import ApexChart from "react-apexcharts";
import config from "./config.js";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

const colors = config.chartColors;

let columnColors = [
  colors.blue,
  colors.green,
  colors.orange,
  colors.red,
  colors.default,
  colors.gray,
  colors.teal,
  colors.pink
];

function BarChart(props) {
  const theme = useTheme();
  const state = {
    options: {
      chart: {
        height: 350,
        type: "bar"
      },
      theme: {
        mode: theme.palette.type
      },
      title: {
        text: props.title
      },
      colors: columnColors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: props.dataLabelsShow
      },
      legend: {
        show: props.legendShow
      },
      xaxis: {
        type: props.labelsType,
        categories: props.labels,
        labels: {
          rotate: props.labelsRotate,
          style: {
            colors: columnColors,
            fontSize: "14px"
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
      //     yaxis: {
      //       labels: {
      //         style: {
      //           color: colors.textColor,
      //         },
      //       },
      //     },
      //     tooltip: {
      //       theme: "dark",
      //   },
      //   grid: {
      //     borderColor: colors.gridLineColor,
      //   },
    },
    series: [
      {
        name: props.name,
        data: props.data
      }
    ]
  };

  // ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  // 'August', 'September', 'October', 'November', 'December'],

  return (
    <div className="ApexChart">
      <ApexChart height="350" series={state.series} options={state.options} type="bar" />
    </div>
  );
}

BarChart.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

BarChart.defaultProps = {
  labelsType: "category",
  labelsRotate: -45,
  legendShow: false,
  dataLabelsShow: false,
  colors: columnColors
};

export default BarChart;
