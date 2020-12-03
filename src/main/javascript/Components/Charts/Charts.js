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

const theme = createMuiTheme();

function Charts (){
    let classes = useStyles();
    let fixedHeightPaperChart = clsx(classes.paper, classes.fixedHeightChart);
    let CategoryAmountFixedHeight = clsx(classes.paper, classes.fixedHeightCategory)
    let SpentFixedHeight = clsx(classes.paper, classes.fixedHeight50)

    let monthChartData = {
        labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'],
        data: [3000, 3000, 4000, 5000, 1200, 3000, 5000, 3000, 4032, 5255, 3232, 3131],
        name: "Expenses"
    }

    let categoryPie = {
        labels: ['Food', 'Home', 'Car', 'Commute', 'Luxuries'],
        data: [1000, 400, 500, 150, 400]
    }

    let SpentCirceData = {
        labels: ["Spent This Month"],
        data: [87]
    }

    let CategoryBarChart = {
        labels: ['Food', 'Home', 'Car', 'Commute', 'Luxuries'],
        data: [1000, 400, 500, 150, 400],
        name: "Expanses by category"
    }
    // render() {
        return (
            <div className="Charts">
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                             <Paper className={CategoryAmountFixedHeight}>
                                <CAP/> 
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
                                    <CategoryPie labels={categoryPie.labels} data={categoryPie.data}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                    <Paper className={fixedHeightPaperChart}>
                                    <BarChart labels={CategoryBarChart.labels} data={CategoryBarChart.data} name={CategoryBarChart.name}/>
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