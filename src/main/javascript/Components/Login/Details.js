import React from "react";
import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { goBack, setUserExists, setLimit, setReminderTime, setSendReminder } from "../../actions/registerActions.js";
import AuthService, { User } from "../../api/AuthService";
import { useHistory } from "react-router-dom";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Collapse from "@material-ui/core/Collapse";
import Switch from "@material-ui/core/Switch";

import { PurpleGradientButton } from "../Misc/ColoredButtons.js";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Details(props) {
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = async event => {
    event.preventDefault();

    if (!(await AuthService.register(props.user))) {
      props.setUserExists(true);
      return;
    }

    await AuthService.login(props.user.getCreds());

    fetch("/api/limit", {
      method: "Put",
      headers: AuthService.getAuthHeader(),
      body: JSON.stringify(Math.floor(Number.parseFloat(props.limit) * 100))
    })
      .then(respone => {})
      .catch(error => {
        console.log(error);
        ErrorCodeHandler(error.status);
      });

    history.push("/app");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Set up account details
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="limit"
                variant="outlined"
                required
                fullWidth
                id="limit"
                label="Limit"
                value={props.limit}
                onChange={e => {
                  props.setLimit(e.target.value);
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction={"row"}>
                <Grid item>
                  <h6>Send a daily reminder?</h6>
                </Grid>
                <Grid item>
                  <div style={{ marginTop: "-10px" }}>
                    <Switch
                      checked={props.sendReminder}
                      onChange={e => props.setSendReminder(e.target.checked)}
                      name=""
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginTop: "-25px" }}>
                <Collapse in={props.sendReminder}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      style={{ width: "100%" }}
                      margin="normal"
                      id="time-reminder"
                      label="Time to send a reminder"
                      value={props.time}
                      onChange={data => {
                        props.setReminderTime(data);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change time"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Collapse>
              </div>
            </Grid>
          </Grid>
          <PurpleGradientButton type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign Up
          </PurpleGradientButton>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              props.goBack();
            }}
          >
            Go Back
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  step: state.register.step,
  user: state.register.user,
  limit: state.register.limit,
  time: state.register.reminderTime,
  sendReminder: state.register.sendReminder
});

export default connect(mapStateToProps, { goBack, setUserExists, setLimit, setReminderTime, setSendReminder })(Details);
