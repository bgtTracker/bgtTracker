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

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          height: 350,
          type: "bar"
        },
        title: {
          text: this.props.title
        },
        colors: columnColors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: this.props.dataLabelsShow
        },
        legend: {
          show: this.props.legendShow
        },
        xaxis: {
          type: this.props.labelsType,
          categories: this.props.labels,
          labels: {
            rotate: this.props.labelsRotate,
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
          name: this.props.name,
          data: this.props.data
        }
      ]
    };
  }

  // ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  // 'August', 'September', 'October', 'November', 'December'],

  render() {
    return (
      <div className="ApexChart">
        <ApexChart height="350" series={this.state.series} options={this.state.options} type="bar" />
      </div>
    );
  }
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
