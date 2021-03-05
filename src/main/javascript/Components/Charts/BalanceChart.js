import React, { Component } from "react";
import ApexChart from "react-apexcharts";
import config from "./config.js";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

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

function BalanceChart(props) {
  const theme = useTheme();
  const d = props.drawerOpen;
  const state = {
    series: [
      {
        name: props.name,
        data: props.data
      }
    ],
    options: {
      title: {
        text: "Balance"
        // style: {
        //   color: theme.palette.text.primary,
        // }
      },
      // tooltip: {
      //   theme: 'dark',
      // },
      chart: {
        type: "bar",
        height: 450
        //background: theme.palette.background.paper
      },
      theme: {
        mode: theme.palette.type
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -1000000000000,
                to: -1,
                color: "#de1f12"
              },
              {
                from: 0,
                to: 1000000000000,
                color: "#15de12"
              }
            ]
          },
          columnWidth: "80%"
        }
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        title: {
          text: "Balance"
          // style: {
          //   color: theme.palette.text.primary
          // }
        },
        labels: {
          formatter: function (y) {
            return y.toFixed(0);
          }
          // style: {
          //   colors: [theme.palette.text.primary],
          // }
        }
      },
      xaxis: {
        type: "datetime",
        categories: props.labels,
        labels: {
          rotate: -90
          // style: {
          //   colors: [theme.palette.text.primary],
          // }
        }
      }
    }
  };

  // ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  // 'August', 'September', 'October', 'November', 'December'],

  return (
    <div className="ApexChart">
      <ApexChart height="450" series={state.series} options={state.options} type="bar" />
    </div>
  );
}

BalanceChart.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

BalanceChart.defaultProps = {
  currency: "pln"
};

const mapStateToProps = state => ({
  drawerOpen: state.main.drawerOpen
});

export default connect(mapStateToProps, {})(BalanceChart);
