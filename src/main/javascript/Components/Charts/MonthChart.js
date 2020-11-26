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
                  categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'],
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
                data: [3000, 3000, 4000, 5000, 1200, 3000, 5000, 3000, 4032, 5255, 3232, 3131]
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