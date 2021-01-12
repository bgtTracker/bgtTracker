import React, { Component } from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import BarChart from "./BarChart.js";
import CAP from "./CategoryAmount/CategoryAmountPrinter.js";
import CategoryPie from "./CategoryPie.js";
import { useStyles } from "../Theme.js";
import BalanceChart from "./BalanceChart.js";
import LPCH from "./LinePlusColumnChart.js";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const theme = createMuiTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

function Charts(props) {
  let classes = useStyles();
  let fixedHeightPaperChart = clsx(classes.paper, classes.fixedHeightChart);
  let CategoryAmountFixedHeight = clsx(classes.paper, classes.fixedHeightCategory);

  const [valueCategories, setValueCategories] = React.useState(0);
  const [valueChart, setChart] = React.useState(0);

  const handleChangeCategories = (event, newValue) => {
    setValueCategories(newValue);
  };

  const handleChangeIndexCategories = index => {
    setValueCategories(index);
  };

  const handleChangeChart = (event, newValue) => {
    setChart(newValue);
  };

  const handleChangeIndexChart = index => {
    setChart(index);
  };
  // console.log("balance");
  // console.log(props.balanceData.labels);
  // console.log(props.balanceData.data);
  // render() {
  return (
    <div className="Charts">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* <Grid item xs={12}>
                             <Paper className={CategoryAmountFixedHeight}>
                                <CAP labels={props.categoryData.labels} data={props.categoryData.data}/> 
                             </Paper>
                        </Grid>       */}
          {/* <Grid item xs = {12}>
                          <Paper className={SpentFixedHeight}>
                            <Spent/>
                          </Paper>
                        </Grid>  */}
          <Grid container spacing={2} direction="row" justify="center" alignItems="center">
            <Grid item xs={6}>
              <Paper className={fixedHeightPaperChart}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={valueCategories}
                    onChange={handleChangeCategories}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Expanses Categories" {...a11yProps(0)} />
                    <Tab label="Incomes Categories" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={valueCategories}
                  onChangeIndex={handleChangeIndexCategories}
                >
                  <TabPanel value={valueCategories} index={0} dir={theme.direction}>
                    <CategoryPie
                      labels={props.categoryData.labels}
                      data={props.categoryData.data}
                      colors={props.categoryData.colors}
                      title={"Spendings per category"}
                    />
                  </TabPanel>
                  <TabPanel value={valueCategories} index={1} dir={theme.direction}>
                    <CategoryPie
                      labels={props.IncomesCategoryData.labels}
                      data={props.IncomesCategoryData.data}
                      colors={props.IncomesCategoryData.colors}
                      title={"Incomes per category"}
                    />
                  </TabPanel>
                </SwipeableViews>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaperChart}>
                <BalanceChart labels={props.balanceData.labels} data={props.balanceData.data} name={"Balance: "} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaperChart}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={valueChart}
                    onChange={handleChangeChart}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Expanses Chart" {...a11yProps(0)} />
                    <Tab label="Incomes Chart" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={valueChart}
                  onChangeIndex={handleChangeIndexChart}
                >
                  <TabPanel value={valueChart} index={0} dir={theme.direction}>
                    <BarChart
                      labels={props.monthlyExpenses.labels}
                      data={props.monthlyExpenses.data}
                      name={"Expenses"}
                      labelsType={"datetime"}
                      title={"Expenses"}
                    />
                  </TabPanel>
                  <TabPanel value={valueChart} index={1} dir={theme.direction}>
                    <BarChart
                      labels={props.monthlyIncomes.labels}
                      data={props.monthlyIncomes.data}
                      name={"Incomes"}
                      labelsType={"datetime"}
                      title={"Incomes"}
                    />
                  </TabPanel>
                </SwipeableViews>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Charts;
