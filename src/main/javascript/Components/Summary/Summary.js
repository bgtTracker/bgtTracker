import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SummaryGetter from "./SummaryGetter.js";
import SelectPeriodDialog from "./SelectPeriodDialog.js";
import Grid from "@material-ui/core/Grid";
import SpentCircle from "../Charts/SpentCircle.js";
import Paper from "@material-ui/core/Paper";
import clientJson from "../../clientJson.js";
import History from "../History/HistoryTableDetails.js";
import AuthService from "../../api/AuthService.js";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  fixedHeight50: {
    height: 50
  },
  fixedHeight480: {
    height: 480
  },
  fixedHeight4: {
    height: 4
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

export default function Summary() {
  let userID = 1;

  const [SpentCirceData, setSpentCirceData] = useState();

  const classes = useStyles();
  let spentPercentage = clsx(classes.paper, classes.fixedHeight480);
  const [fromDate, setFromDate] = useState(new Date("2014-08-18T21:11:54"));
  const [toDate, setToDate] = useState(new Date("2014-08-18T21:11:54"));

  const [curPeriod, setcurPeriod] = useState("This Month");
  const periods = ["thisMonth", "thisYear", "lastYear", "customPeriod"];
  const nicelyWirtenPeriods = ["This Month", "This Year", "Last Year"];
  const [period, setPeriod] = useState({
    thisMonth: true,
    thisYear: false,
    lastYear: false,
    customPeriod: false
  });

  const defaultPeriod = {
    thisMonth: false,
    thisYear: false,
    lastYear: false,
    customPeriod: false
  };

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [customPeriodDialogOpened, setcustomPeriodDialogOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpened(open);
  };

  const handlePeriodChange = p => event => {
    let i = periods.indexOf(p);
    setcurPeriod(nicelyWirtenPeriods[i]);
    setPeriod({ ...defaultPeriod, [p]: true });
  };

  const handleCustomPeriodChange = p => event => {
    setcustomPeriodDialogOpen(true);
  };

  const openCustiomPeriodChange = () => {
    setPeriod({ ...defaultPeriod, ["customPeriod"]: true });
    setcurPeriod("Custom Period");
  };

  const saveDates = (fData, tData) => {
    setFromDate(fData);
    setToDate(tData);
    setcustomPeriodDialogOpen(false);
  };

  let nowDate = new Date();
  let toDateForQuerry = nowDate.getTime().toString();
  let fromDateForQuerry = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getTime().toString();

  useEffect(() => {
    clientJson({
      method: "GET",
      path: "/api/summary/",
      headers: AuthService.getAuthHeader(),
      params: {
        from: fromDateForQuerry,
        to: toDateForQuerry,
        usrid: userID
      }
    }).then(response => {
      console.log(response.entity);
      let sum = response.entity.expenses.data.reduce((a, b) => a + b, 0);
      let spent = (sum / response.entity.limit) * 100;
      setSpentCirceData({
        labels: ["Spent This Month"],
        data: [spent]
      });
    });
  }, []);

  const list = () => (
    <div
      className={clsx(classes.list, classes.fullList)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {nicelyWirtenPeriods.map((text, index) => (
          <ListItem button key={text} onClick={handlePeriodChange(periods[index])}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Custom Period"].map((text, index) => (
          <ListItem button key={text} onClick={handleCustomPeriodChange(periods[3])}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Grid container spacing={4}>
        <div className={classes.fixedHeight4}></div>
        <Grid item xs={12}>
          <Paper className={spentPercentage}>
            {SpentCirceData === undefined ? (
              <div style={{ alignSelf: "center" }}>
                <Skeleton variant="circle" width={250} height={250} />
              </div>
            ) : (
              <SpentCircle labels={SpentCirceData.labels} data={SpentCirceData.data} />
            )}
            {customPeriodDialogOpened === true ? (
              <SelectPeriodDialog changeCustomPeriodSelected={openCustiomPeriodChange} saveData={saveDates} />
            ) : (
              <div />
            )}
            <div>
              <React.Fragment key={"bottom"}>
                <div
                  className="wrap"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                  }}
                >
                  <div className="cur">
                    <p>Current Period: {curPeriod}</p>
                  </div>
                  <div className="button">
                    <Button onClick={toggleDrawer(true)}>Select Period</Button>
                  </div>
                </div>
                <Drawer anchor={"bottom"} open={drawerOpened} onClose={toggleDrawer(false)}>
                  {list()}
                </Drawer>
              </React.Fragment>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {/* // this is just horrible but i coudn't get to rerender componet at the moment and didn't have time to solve */}
          {period.thisMonth === true ? <SummaryGetter period={"thisMonth"} /> : <div />}
          {period.thisYear === true ? <SummaryGetter period={"thisYear"} /> : <div />}
          {period.lastYear === true ? <SummaryGetter period={"lastYear"} /> : <div />}
          {period.customPeriod === true ? (
            <SummaryGetter period={"customPeriod"} to={toDate} from={fromDate} />
          ) : (
            <div />
          )}
        </Grid>
        {/* <Grid item xs={12}> 
                    <Paper className={classes.paper}>
                        {period.thisMonth  === true ? <History period={'thisMonth'}/> : <div/>}
                        {period.thisYear  === true ? <History  period={'thisYear'}/> : <div/>}
                        {period.lastYear  === true ? <History  period={'lastYear'}/> : <div/>}
                        {period.customPeriod  === true ? <History  period={'customPeriod'} to={toDate} from={fromDate}/> : <div/>}
                   </Paper>         
                </Grid>   */}
      </Grid>
    </div>
  );
}
