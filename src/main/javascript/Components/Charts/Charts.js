import React, { Component } from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import BarChart from './BarChart.js'
import CAP from './CategoryAmount/CategoryAmountPrinter.js';
import CategoryPie from './CategoryPie.js';
import {useStyles} from '../Theme.js';
import Spent from "./Spent.js";
import SpentCircle from "./SpentCirce.js";
import BalanceChart from "./BlanceChart.js";

const theme = createMuiTheme();

function Charts (){
    let classes = useStyles();
    let fixedHeightPaperChart = clsx(classes.paper, classes.fixedHeightChart);
    let CategoryAmountFixedHeight = clsx(classes.paper, classes.fixedHeightCategory)
    let SpentFixedHeight = clsx(classes.paper, classes.fixedHeight50)

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
    let monthChartData = {
        labels : months,
        data: [3000, 3000, 4000, 5000, 1200, 3000, 5000, 3000, 4032, 5255, 3232, 3131],
        name: "Expenses"
    }

    let SpentCirceData = {
        labels: ["Spent This Month"],
        data: [87]
    }

    let CategoryData = {
        labels: ['Food', 'Home', 'Car', 'Commute', 'Luxuries'],
        data: [1000, 400, 500, 150, 400],
        name: "Expanses by category"
    }

    let BalanceData = {
        labels: ["2020-11-00", "2020-11-01", "2020-11-02", "2020-11-03", "2020-11-04", "2020-11-05", "2020-11-06", "2020-11-07", 
        "2020-11-08", "2020-11-09", "2020-11-10", "2020-11-11", "2020-11-12", "2020-11-13", "2020-11-14", "2020-11-15", 
        "2020-11-16", "2020-11-17", "2020-11-18", "2020-11-19", "2020-11-20", "2020-11-21", "2020-11-22", "2020-11-23", 
        "2020-11-24", "2020-11-25", "2020-11-26", "2020-11-27", "2020-11-28", "2020-11-29"],
        data: [886, -279, -237, -886, -168, -159, 1245, 1991, 337, 1714, -223, 1717, 386, 252, -546, 1832, 592, -879, 1071, -908, -89, 1118, 1211, -823, 810, 1189, 1263, 377, 999, 1103],
        labelsType: 'datetime',
        name: "Balance for day: "
    }
    // render() {
        return (
            <div className="Charts">
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                             <Paper className={CategoryAmountFixedHeight}>
                                <CAP labels={CategoryData.labels} data={CategoryData.data}/> 
                             </Paper>
                        </Grid>      
                        <Grid item xs = {12}>
                          <Paper className={SpentFixedHeight}>
                            <Spent/>
                          </Paper>
                        </Grid> 
                            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                            <Grid item  xs={6}>
                                <Paper className={fixedHeightPaperChart}>
                                    <CategoryPie labels={CategoryData.labels} data={CategoryData.data}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                    <Paper className={fixedHeightPaperChart}>
                                    <BalanceChart labels={BalanceData.labels} data={BalanceData.data} name={BalanceData.name}/>
                                    </Paper>
                            </Grid>       
                            <Grid item  xs={12}>
                                <Paper className={fixedHeightPaperChart}>
                                    <BarChart labels={monthChartData.labels} data={monthChartData.data} name={monthChartData.name}/>
                                </Paper>
                            </Grid>
                            <Grid item  xs={6}>
                                <Paper className={fixedHeightPaperChart}>
                                    <SpentCircle labels={SpentCirceData.labels} data={SpentCirceData.data}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    
}

export default Charts;



