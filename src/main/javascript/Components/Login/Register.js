import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@material-ui/core";
import RegexTextField from "../RegexTextField";
import AuthService, { User } from "../../api/AuthService";
import { PurpleGradientButton } from "../Misc/ColoredButtons.js";
import ChangeTitle from "../ChangeTitle";

import { connect } from "react-redux";
import { addUser, nextStep, setUserExists } from "../../actions/registerActions.js";

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

function Register(props) {
  const classes = useStyles();
  const history = useHistory();
  const userExists = props.userExists;

  const onSubmit = async event => {
    event.preventDefault();

    let user = new User(
      document.getElementById("email").value,
      document.getElementById("password").value,
      document.getElementById("firstName").value,
      document.getElementById("lastName").value
    );

    props.addUser(user);

    if (!(await AuthService.register(user))) {
      props.setUserExists(true);
      return;
    }

    await AuthService.login(user.getCreds());
    history.push("/app");
  };

  const onNextStep = () => {
    let user = new User(
      document.getElementById("email").value,
      document.getElementById("password").value,
      document.getElementById("firstName").value,
      document.getElementById("lastName").value
    );

    props.addUser(user);

    let allAreFilled = true;
    document
      .getElementById("registerFrom")
      .querySelectorAll("[required]")
      .forEach(function (i) {
        if (!allAreFilled) return;
        if (!i.value) allAreFilled = false;
        if (i.type === "radio") {
          let radioValueCheck = false;
          document
            .getElementById("myForm")
            .querySelectorAll(`[name=${i.name}]`)
            .forEach(function (r) {
              if (r.checked) radioValueCheck = true;
            });
          allAreFilled = radioValueCheck;
        }
      });

    if (allAreFilled) {
      props.nextStep();
    } else {
      alert("You have to fill required fields");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ChangeTitle title="Sign up - bgtTracker" />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form id="registerFrom" className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <RegexTextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                regex={/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
                invalidText="Invalid email address"
                error={userExists}
                helperText={userExists ? "This user already exists" : undefined}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign Up - Leave default details
          </Button>
          <PurpleGradientButton fullWidth variant="contained" color="primary" onClick={onNextStep}>
            Next Step - Configure account details
          </PurpleGradientButton>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  user: state.register.user,
  userExists: state.register.userExists
});

export default connect(mapStateToProps, { addUser, nextStep, setUserExists })(Register);
