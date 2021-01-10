import React from "react";
import BalanceChart from "./Charts/BalanceChart";
import ChangeTitle from "./ChangeTitle";
import HistoryTable from "./History/HistoryTable";
import SpentCircle from "./Charts/SpentCircle";
import { Grid, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import AuthService from "../api/AuthService";
import ErrorCodeHandling from "./ErrorCodeHandler";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: "450px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

let headCells = [
  { id: "name", label: "Name", numeric: false, disablePadding: false },
  { id: "date", label: "Date", numeric: false, disablePadding: false },
  { id: "amount", label: "Amount", numeric: true, disablePadding: false }
];

export default function Dashboard() {
  const classes = useStyles();
  const [expenses, setExpenses] = React.useState();
  const [spentData, setSpentData] = React.useState();
  const [balanceData, setBalanceData] = React.useState();
  const [historyData, setHistoryData] = React.useState();

  React.useEffect(() => {
    fetch("/api/expenses", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(response => response.json())
      .then(data => {
        data = data.map(elem => ({ ...elem, date: new Date(elem.date) }));

        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        let monthlyData = data.filter(elem => elem.date >= firstDay && elem.date <= lastDay);

        const spentThisMonth = monthlyData.reduce((total, elem) => total + elem.amount, 0);

        let days = [];
        let dailyExpenses = [];

        for (let i = firstDay; i <= lastDay; i.setDate(i.getDate() + 1)) {
          days.push(i);
        }

        for (let day in days) {
          dailyExpenses.push(
            monthlyData.filter(elem => elem.date.getDate() === day).reduce((total, elem) => total + elem, 0)
          );
        }

        setExpenses(data);

        setSpentData({
          labels: ["Spent this month"],
          data: [spentThisMonth]
        });

        setHistoryData(monthlyData.map(elem => ({ name: elem.name, date: elem.date.getTime(), amount: elem.amount })));

        setBalanceData({
          labels: days.map(elem => elem.getTime()),
          data: dailyExpenses
        });
      });
    // .catch(error => {
    //   console.error(error);
    // })
  }, []);

  return (
    <>
      <ChangeTitle title="Dashboard - bgtTracker" />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper className={classes.paper}>
            {spentData ? <SpentCircle labels={spentData.labels} data={spentData.data} /> : <Skeleton variant="rect" />}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper className={classes.paper}>
            {balanceData ? (
              <BalanceChart name="Daily expenses" labels={balanceData.labels} data={balanceData.data} />
            ) : (
              <Skeleton variant="rect" />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {expenses ? (
            <HistoryTable headCells={headCells} rows={historyData} />
          ) : (
            <Paper className={classes.paper}>
              <Skeleton variant="rect" />
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
}
