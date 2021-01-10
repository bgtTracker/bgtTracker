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

class LinePlusColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          height: 350,
          type: "line"
        },
        fill: {
          type: "gradient"
        },
        colors: columnColors,
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        lables: this.props.labels,
        xaxis: {
          type: this.props.labelsType,
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
      },
      series: [
        {
          name: this.props.name,
          data: this.props.data,
          type: "line"
        },
        {
          name: this.props.name,
          data: this.props.data,
          type: "column"
        }
      ]
    };
  }

  // ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  // 'August', 'September', 'October', 'November', 'December'],

  render() {
    return (
      <div className="ApexChart">
        <ApexChart height="350" series={this.state.series} options={this.state.options} type="line" />
      </div>
    );
  }
}

LinePlusColumnChart.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

LinePlusColumnChart.defaultProps = {
  labelsType: "datetime",
  labelsRotate: -45
};

export default LinePlusColumnChart;
