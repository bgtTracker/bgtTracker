import React, { Component } from "react";
import ApexCharts from "react-apexcharts";
import { useTheme } from "@material-ui/core/styles";

export default function SpentCircle(props) {
  const theme = useTheme();
  const state = {
    series: props.data,
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      // theme: {
      //   mode: theme.palette.type,
      // },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: theme.palette.background.paper,
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            // background: theme.palette.background.paper,
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              // color: "#888",
              color: theme.palette.action.active,
              fontSize: "17px"
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: theme.palette.text.primary,
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: props.labels
    }
  };

  return (
    <div>
      <ApexCharts options={state.options} series={state.series} type="radialBar" height={350} />
    </div>
  );
}
