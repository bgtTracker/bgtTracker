import React, { Component } from "react";
import ApexChart from "react-apexcharts";
import config from "./config.js";
import PropTypes from "prop-types";

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

class BalanceChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: this.props.name,
          data: this.props.data
        }
      ],
      options: {
        title: {
          text: "Balance"
        },
        chart: {
          type: "bar",
          height: 450
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
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0);
            }
          }
        },
        xaxis: {
          type: "datetime",
          categories: this.props.labels,
          labels: {
            rotate: -90
          }
        }
      }
    };
  }

  // ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  // 'August', 'September', 'October', 'November', 'December'],

  render() {
    return (
      <div className="ApexChart">
        <ApexChart
          height="450"
          series={this.state.series}
          options={this.state.options}
          type="bar"
        />
      </div>
    );
  }
}

BalanceChart.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

BalanceChart.defaultProps = {
  currency: "pln"
};

export default BalanceChart;
