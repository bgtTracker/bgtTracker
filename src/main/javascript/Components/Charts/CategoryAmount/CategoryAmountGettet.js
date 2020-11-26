import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class CategoryAmountGettet extends Component {
    constructor(probs){
        super(probs)
        
        this.state = {
            categories: ['Food', 'Home', 'Car', 'Commute', 'Luxuries'],
            data: [1000, 400, 500, 150, 400]
        }
    }
    render() {
        return this.state.categories.map((category, index) => (
                <Grid item xs={1}><Paper> {category}: {this.state.data[index]} </Paper></Grid>
                ))
        
    }
}
