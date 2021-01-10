import React, { Component } from "react";
import { Progress } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import useStyle from "../Theme.js";

export default class Spent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: ["primary", "secondary", "success", "danger", "warning", "info"],
      categories: ["Food", "Home", "Car", "Commute", "Luxuries", "Left to Spent"],
      data: [1000, 400, 500, 150, 400, 3000],
      values: []
    };
    let sum = this.state.data.reduce((a, b) => a + b, 0);
    for (let i = 0; i < this.state.data.length; i++) {
      let value = (this.state.data[i] / sum) * 100;
      this.state.values.push(value);
    }
  }

  render() {
    return (
      <Progress multi>
        <SpentBarGetter colors={this.state.colors} values={this.state.values} categories={this.state.categories} />
      </Progress>
    );
  }
}

class SpentBarGetter extends Component {
  getProgresBars() {
    let cIndex = 0;
    var ret = (
      <Progress bar animated color={this.props.colors[cIndex]} value={this.props.values[0]}>
        {" "}
        {this.props.categories[0]}{" "}
      </Progress>
    );
    cIndex++;
    for (let i = 1; i < this.props.values.length; i++) {
      let newTag = (
        <Progress bar animated color={this.props.colors[cIndex]} value={this.props.values[i]}>
          {" "}
          {this.props.categories[i]}
        </Progress>
      );
      ret = [ret, newTag];
      cIndex++;
      if (cIndex >= this.props.colors.length) {
        cIndex = 0;
      }
    }
    return ret;
  }

  render() {
    return this.getProgresBars();
  }
}
