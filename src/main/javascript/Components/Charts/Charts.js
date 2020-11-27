import React, { Component } from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import MonthChart from './MonthChart.js'
import CategoryBarChart from './CategoryBarChar.js';
import CAP from './CategoryAmount/CategoryAmountPrinter.js';
import CategoryPie from './CategoryPie.js';
import {useStyles} from '../Theme.js';
import Spent from "./Spent.js";

const theme = createMuiTheme();

function Charts (){
    let classes = useStyles();
    let fixedHeightPaperChart = clsx(classes.paper, classes.fixedHeightChart);
    let CategoryAmountFixedHeight = clsx(classes.paper, classes.fixedHeightCategory)
    let SpentFixedHeight = clsx(classes.paper, classes.fixedHeight50)
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
                                    <CategoryPie/>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                    <Paper className={fixedHeightPaperChart}>
                                    <CategoryBarChart/>
                                    </Paper>
                            </Grid>       
                            <Grid item  xs={12}>
                                <Paper className={fixedHeightPaperChart}>
                                    <MonthChart/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    
}

export default Charts;