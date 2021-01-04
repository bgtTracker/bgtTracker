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

export default class CategoryPie extends Component {
  constructor(probs) {
    super(probs);

    this.state = {
      series: this.props.data,
      options: {
        title: {
          text: this.props.title
        },
        labels: this.props.labels,
        chart: {
          size: 350,
          type: "donut"
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
          enabled: false
        },
        fill: {
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
  }
  render() {
    return (
      <div className="ApexChart">
        <ApexChart
          height="350"
          series={this.state.series}
          options={this.state.options}
          type="donut"
        />
      </div>
    );
  }
}

CategoryPie.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
