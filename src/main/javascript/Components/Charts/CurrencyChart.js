import React from "react";
import ApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

export default function CurrencyChart(props) {
  const theme = useTheme();
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
    theme: {
      mode: theme.palette.type
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
      name: "Date",
      categories: props.lables
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
