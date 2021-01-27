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

    let name = "ApexChart";
    if (this.props.name) name = this.props.name;

    this.state = {
      name: name,
      series: this.props.data,
      options: {
        title: {
          text: this.props.title
        },
        labels: this.props.labels,
        colors: this.props.colors,
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
          enabled: true
        },
        fill: {
          colors: this.props.colors,
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
      <div className={this.state.name}>
        <ApexChart height="350" series={this.state.series} options={this.state.options} type="donut" />
      </div>
    );
  }
}

CategoryPie.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
