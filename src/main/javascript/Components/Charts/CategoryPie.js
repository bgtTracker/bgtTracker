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

export default function CategoryPie(props) {
  let name = "ApexChart";
  if (props.name) name = props.name;

  const theme = useTheme();
  const state = {
    name: name,
    series: props.data,
    options: {
      title: {
        text: props.title
      },
      labels: props.labels,
      colors: props.colors,
      chart: {
        size: 350,
        type: "donut"
      },
      theme: {
        mode: theme.palette.type
      },
      plotOptions: {
        pie: {
          size: 200
        },
        donut: {
          size: "55%"
        },
        expandOnClick: true
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        colors: props.colors,
        type: "gradient"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  };

  return (
    <div className={state.name}>
      <ApexChart height="350" series={state.series} options={state.options} type="donut" />
    </div>
  );
}

CategoryPie.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
