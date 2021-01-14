import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Skeleton } from "@material-ui/lab";
import AuthService from "../../api/AuthService.js";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}
//"CAD" ,"HKD","ISK","PHP","DKK":7.4369,"HUF":359.62,"CZK":26.163,"AUD":1.5758,"RON":4.8708,"SEK":10.051,"IDR":17247.33,"INR":89.7975,"BRL":6.5748,"RUB":90.8,"HRK":7.569,"JPY":127.26,"THB":36.848,"CHF":1.0827,"SGD":1.6228,"PLN":4.5113,"BGN":1.9558,"TRY":9.0146,"CNY":7.9184,"NOK":10.2863,"NZD":1.6883,"ZAR":18.7212,"USD":1.225,"MXN":24.4718,"ILS":3.8981,"GBP":0.90128,"KRW":1337.9,"MYR":4.9359

export default function CurrencySelect() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState();
  const [right, setRight] = React.useState();

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const submit = () => {
    fetch("/api/currency/user", {
      method: "POST",
      headers: AuthService.getAuthHeader(),
      body: JSON.stringify(left)
    })
      .then(respone => {
        console.log(respone);
      })
      .catch(error => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetch("/api/currency/userSummary", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(respone => respone.json())
      .then(respone => {
        console.log(respone);
        setLeft(respone.user);
        setRight(respone.left);
      })
      .catch(error => {
        ErrorCodeHandler(error.status);
      });
  }, []);

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>
        {left === undefined ? (
          <Skeleton variant="rect" height={120} width={70} />
        ) : (
          customList("Youre currencies", left)
        )}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {right === undefined ? (
          <Skeleton variant="rect" height={120} width={70} />
        ) : (
          customList("Aviable currencies", right)
        )}
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Button onClick={submit}>Submit</Button>
        </div>
      </Grid>
    </Grid>
  );
}
