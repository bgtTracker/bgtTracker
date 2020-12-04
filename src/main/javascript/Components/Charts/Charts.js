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

function Charts (props){
    let classes = useStyles();
    let fixedHeightPaperChart = clsx(classes.paper, classes.fixedHeightChart);
    let CategoryAmountFixedHeight = clsx(classes.paper, classes.fixedHeightCategory)
    let SpentFixedHeight = clsx(classes.paper, classes.fixedHeight50)

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

    let SpentCirceData = {
        labels: ["Spent This Month"],
        data: [87]
    }

    // render() {
        return (
            <div className="Charts">
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                             <Paper className={CategoryAmountFixedHeight}>
                                <CAP labels={props.categoryData.labels} data={props.categoryData.data}/> 
                             </Paper>
                        </Grid>      
                        {/* <Grid item xs = {12}>
                          <Paper className={SpentFixedHeight}>
                            <Spent/>
                          </Paper>
                        </Grid>  */}
                            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                            <Grid item  xs={6}>
                                <Paper className={fixedHeightPaperChart}>
                                    <CategoryPie labels={props.categoryData.labels} data={props.categoryData.data}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                    <Paper className={fixedHeightPaperChart}>
                                    <BalanceChart labels={props.balanceData.labels} data={props.balanceData.data} name={"Balance: "}/>
                                    </Paper>
                            </Grid>       
                            <Grid item  xs={12}>
                                <Paper className={fixedHeightPaperChart}>
                                    <BarChart labels={props.monthChartData.labels} data={props.monthChartData.data} name={"Expenses"} labelsType={'datatime'}/>
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



