import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CAG from './CategoryAmountGettet.js';

export default class CategoryAmountPrinter extends Component {
    constructor(probs){
        super(probs)
        
    }
    render() {
        return (
            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                <CAG labels={this.props.labels} data={this.props.data}/>
            </Grid>    
        )
    }
}
