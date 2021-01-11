import React, { useState, useEffect } from "react";
import Charts from "../Charts/Charts.js";
import clientJson from "../../clientJson.js";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import HistoryTable from "../History/HistoryTable.js";
import AuthService from "../../api/AuthService.js";

const theme = createMuiTheme();

const useStyles = makeStyles({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
});

let headCells = [
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
  { id: "expenses", numeric: true, disablePadding: false, label: "Expenses" },
  { id: "income", numeric: true, disablePadding: false, Label: "Income" },
  { id: "balance", numeric: true, disablePadding: false, label: "Balance" }
];

export default function SummaryGetter(props) {
  const classes = useStyles();
  const [state, setState] = useState();
  const [rows, setRows] = useState();

  let fromDate;
  let toDate;
  let now = new Date();

  switch (props.period) {
    case "thisMonth":
      toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime().toString();
      fromDate = new Date(now.getFullYear(), now.getMonth(), 1).getTime().toString();
      break;
    case "thisYear":
      toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime().toString();
      fromDate = new Date(now.getFullYear(), 0, 1).getTime().toString();
      break;
    case "lastYear":
      toDate = new Date(now.getFullYear(), 11, 31).getTime().toString();
      fromDate = new Date(now.getFullYear(), 0, 1).getTime().toString();
      break;
    case "customPeriod":
      toDate = props.to.getTime().toString();
      fromDate = props.from.getTime().toString();
      break;
    default:
      console.log("Wrong Period");
      return (
        <div>
          <h1> Wrong period</h1>
        </div>
      );
  }

  useEffect(() => {
    clientJson({
      method: "GET",
      path: "/api/summary/",
      headers: AuthService.getAuthHeader(),
      params: {
        from: fromDate,
        to: toDate,
        usrid: props.userID
      }
    }).then(response => {
      let rows = createRows(response);
      setRows(rows);
      setState(response.entity);
    });
  }, []);

  function createDetails(id, date, type, name, amount) {
    return { id, date, type, name, amount };
  }

  function createData(id, date, expenses, income, balance, d) {
    return {
      id,
      date,
      expenses,
      income,
      balance,
      details: d
    };
  }

  function createRows(resposne) {
    let rows = [];
    let expansesIndex = 0;
    let incomesIndex = 0;
    for (let i = 0; i < resposne.entity.expenses.data.length; i++) {
      if (resposne.entity.expenses.data[i] != 0 || resposne.entity.incomes.data[i] != 0) {
        let details = [];
        if (resposne.entity.expenses.data[i] != 0) {
          let detail = createDetails(
            i,
            new Date(resposne.entity.expenses.history[expansesIndex].dateStamp),
            resposne.entity.expenses.history[expansesIndex].category,
            resposne.entity.expenses.history[expansesIndex].name,
            resposne.entity.expenses.history[expansesIndex].amount
          );
          details.push(detail);
          expansesIndex++;
        }
        if (resposne.entity.incomes.data[i] != 0) {
          let detail = createDetails(
            i + resposne.entity.expenses.data.length,
            new Date(resposne.entity.incomes.history[incomesIndex].dataStamp),
            resposne.entity.incomes.history[incomesIndex].category,
            resposne.entity.incomes.history[incomesIndex].name,
            resposne.entity.incomes.history[incomesIndex].amount
          );
          details.push(detail);
          incomesIndex++;
        }
        rows.push(
          createData(
            i,
            new Date(resposne.entity.expenses.labels[i]),
            resposne.entity.expenses.data[i],
            resposne.entity.incomes.data[i],
            resposne.entity.BalanceData.data[i],
            details
          )
        );
      }
    }
    return rows;
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {state === undefined ? (
            <h1>Loading...</h1>
          ) : (
            <Charts
              IncomesCategoryData={state.IncomesCategoryData}
              categoryData={state.CategoryData}
              balanceData={state.BalanceData}
              monthlyExpenses={state.expenses}
              monthlyIncomes={state.incomes}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {rows === undefined ? <h1>Loading...</h1> : <HistoryTable details={true} rows={rows} />}
        </Grid>
      </Grid>
    </div>
  );
}
