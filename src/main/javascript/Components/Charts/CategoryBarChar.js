import React, { Component } from 'react'
import ApexChart from "react-apexcharts";
import config from "./config.js";

const colors = config.chartColors;

let columnColors = [
    colors.blue,
    colors.green,
    colors.orange,
    colors.red,
    colors.default,
    colors.gray,
    colors.teal,
    colors.pink,
  ];  

class MonthChart extends Component {
    
    constructor(probs){
        super(probs);
        
        this.state = {
            options: {
                chart: {
                  height: 350,
                  type: "bar",
                },
                colors: columnColors,
                plotOptions: {
                  bar: {
                    columnWidth: "45%",
                    distributed: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: ['Food', 'Home', 'Car', 'Commute', 'Luxuries'],
                  labels: {
                    style: {
                      colors: columnColors,
                      fontSize: "14px",
                    },
                  },
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
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
                name: "Previous Year",
                data: [1000, 400, 500, 150, 400]
              }
            ],
            
    }
    }

 

    render() {
        return (
            <div className="ApexChart">
            <ApexChart
                  height="350"
                  series={this.state.series}
                  options={this.state.options}
                  type="bar"
                />              
            </div>
        )
    }
}

export default MonthChart;