import React from "react";
import BalanceChart from "../Charts/BalanceChart";
import ChangeTitle from "../ChangeTitle";
import HistoryTable from "../History/HistoryTable";
import SpentCircle from "../Charts/SpentCircle";
import { Grid, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import AuthService from "../../api/AuthService";
import ErrorCodeHandling from "../ErrorCodeHandler";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./Row.js";
import clsx from "clsx";
import CurrencyChart from "../Charts/CurrencyChart.js";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeigt: {
    height: 500
  }
}));

let headCells = [
  { id: "name", label: "Name", numeric: false, disablePadding: false },
  { id: "date", label: "Date", numeric: true, disablePadding: false },
  { id: "category", label: "Category", numeric: true, disablePadding: false },
  { id: "amount", label: "Amount", numeric: true, disablePadding: false }
];

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeigt);
  const [expenses, setExpenses] = React.useState();
  const [incomes, setInomces] = React.useState();
  const [dailExpense, setDE] = React.useState();
  const [spentMoney, setSpentMoney] = React.useState(0);
  // const [incomes, set]
  const [spentData, setSpentData] = React.useState();
  const [balanceData, setBalanceData] = React.useState();
  const [historyData, setHistoryData] = React.useState();
  const [currencyData, setCurrencyData] = React.useState();
  const [limit, setLimit] = React.useState();

  React.useEffect(() => {
    fetch("/api/getExpenses", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(response => response.json())
      .then(data => {
        console.log("exp");
        setExpenses(data);
      })
      .catch(error => {
        console.error(error);
      });
    fetch("/api/getIncomes", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(response => response.json())
      .then(data => {
        console.log("incomes");
        setInomces(data);
      })
      .catch(error => {
        console.error(error);
      });
    fetch("/api/currency/rates", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(response => response.json())
      .then(data => {
        console.log("currency");
        setCurrencyData(data);
      })
      .catch(error => {
        console.error(error);
      });
    fetch("/api/limit", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(response => response.json())
      .then(data => {
        console.log("limit");
        setLimit(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (
    expenses !== undefined &&
    incomes !== undefined &&
    spentData === undefined &&
    balanceData === undefined &&
    historyData === undefined &&
    limit !== undefined
  ) {
    console.log(incomes);
    console.log(expenses);
    let expensesWithDate = expenses.expense.map(elem => ({ ...elem, date: new Date(elem.dateStamp) }));
    let inomsesWithDate = incomes.income.map(elem => ({ ...elem, date: new Date(elem.dataStamp) }));
    console.log(expensesWithDate);
    console.log(inomsesWithDate);
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let monthlyExpensesData = expensesWithDate.filter(elem => elem.date >= firstDay && elem.date <= lastDay);
    let monthlyIncomesData = inomsesWithDate.filter(elem => elem.date >= firstDay && elem.date <= lastDay);

    const spentThisMonth = monthlyExpensesData.reduce((total, elem) => total + elem.amount, 0);

    let days = [];
    let dailyExpenses = [];
    let dailyIncomes = [];
    let balance = [];

    for (let i = firstDay; i <= lastDay; i.setDate(i.getDate() + 1)) {
      days.push(new Date(i));
    }
    console.log("first");
    for (let day in days) {
      dailyExpenses.push(
        monthlyExpensesData.filter(elem => elem.date.getDate() == day).reduce((total, elem) => total + elem.amount, 0)
      );
      dailyIncomes.push(
        monthlyIncomesData.filter(elem => elem.date.getDate() == day).reduce((total, elem) => total + elem.amount, 0)
      );
      balance.push(
        (monthlyIncomesData.filter(elem => elem.date.getDate() == day).reduce((total, elem) => total + elem.amount, 0) -
          monthlyExpensesData
            .filter(elem => elem.date.getDate() == day)
            .reduce((total, elem) => total + elem.amount, 0)) /
          100
      );
    }
    console.log("half");
    setHistoryData(
      monthlyExpensesData.map(elem => ({
        id: elem.id,
        name: elem.name,
        date: elem.date,
        amount: elem.amount / 100,
        category: elem.category
      }))
    );

    console.log(days);

    let dates2 = [];

    let dates = days.map(elem => elem.getTime());

    console.log(dates);
    console.log(monthlyExpensesData);
    console.log(dailyExpenses);
    console.log(dailyIncomes);
    console.log(balance);
    setBalanceData({
      labels: dates,
      data: balance
    });

    setSpentMoney(spentThisMonth / 100);
    setSpentData({
      labels: ["Spent this month"],
      data: [(spentThisMonth / limit) * 100]
    });
  }

  return (
    <>
      <ChangeTitle title="Dashboard - bgtTracker" />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Paper className={fixedHeightPaper}>
            {spentData ? (
              <div>
                {" "}
                <SpentCircle labels={spentData.labels} data={spentData.data} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                  }}
                >
                  {" "}
                  <p>This mount you spent: {spentMoney}</p>{" "}
                </div>{" "}
              </div>
            ) : (
              <Skeleton variant="rect" />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper className={fixedHeightPaper}>
            {balanceData ? (
              <BalanceChart name="Daily Balance" labels={balanceData.labels} data={balanceData.data} />
            ) : (
              <Skeleton variant="rect" />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {historyData ? (
            <HistoryTable RowObject={Row} headCells={headCells} rows={historyData} />
          ) : (
            <Paper className={classes.paper}>
              <Skeleton variant="rect" />
            </Paper>
          )}
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {currencyData ? (
              <CurrencyChart series={currencyData.series} lables={currencyData.days} />
            ) : (
              <Skeleton variant="rect" />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
