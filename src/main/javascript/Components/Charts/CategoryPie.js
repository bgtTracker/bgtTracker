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

export default class CategoryPie extends Component {
    constructor(probs){
        super(probs)

        this.state = {
            series: [1000, 400, 500, 150, 400],
            options : {
                labels: ['Food', 'Home', 'Car', 'Commute', 'Luxuries'],
                chart: {
                    size: 350,
                    type: 'donut'
                },
                plotOptions: {
                    pie: {
                      size: 200
                    },
                    donut: {
                        size: '65%'
                      },
                    expandOnClick: true  
                  },
                dataLabels: {
                enabled: false
                },
                fill: {
                type: 'gradient',  
                },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }}]
            }
        }
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
        )
    }
}
