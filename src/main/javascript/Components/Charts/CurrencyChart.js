import React from "react";
import ApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default function CurrencyChart(props) {
  var options = {
    series: props.series,
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5]
    },
    title: {
      text: "Currency exchange rates",
      align: "left"
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + "";
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      type: "datetime",
      categories: props.lables
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " (mins)";
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + " per session";
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        }
      ]
    },
    grid: {
      borderColor: "#f1f1f1"
    }
  };

  return (
    <div className="ApexChart">
      <ApexChart height="350" series={options.series} options={options} type="line" />
    </div>
  );
}
