import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CAG from './CategoryAmountGettet.js';

export default class CategoryAmountPrinter extends Component {
    constructor(probs){
        super(probs)
        
        this.state = {
            categories: ['Food', 'Home', 'Car', 'Commute', 'Luxuries'],
            data: [1000, 400, 500, 150, 400]
        }
    }
    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <CAG/>
            </Grid>    
        )
    }
}
