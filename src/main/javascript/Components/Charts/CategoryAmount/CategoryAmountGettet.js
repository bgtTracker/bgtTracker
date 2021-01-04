import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

export default class CategoryAmountGettet extends Component {
  constructor(probs) {
    super(probs);

    this.state = {
      categories: this.props.labels,
      data: this.props.data
    };
  }
  render() {
    return this.state.categories.map((category, index) => (
      <Grid item xs={1}>
        <Paper>
          {" "}
          {category}: {this.state.data[index]}{" "}
        </Paper>
      </Grid>
    ));
  }
}
