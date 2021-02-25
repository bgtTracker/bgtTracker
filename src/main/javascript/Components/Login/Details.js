import React from "react";
import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { goBack, setUserExists, setLimit } from "../../actions/registerActions.js";
import AuthService, { User } from "../../api/AuthService";
import { useHistory } from "react-router-dom";
// import PurpleGradientButton from "../Misc/ColoredButtons.js";

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

export const PurpleGradientButton = withStyles(theme => ({
  root: {
    backgroundImage: "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)"
  }
}))(Button);

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

    //send details to reducer
    props.setLimit(document.getElementById("limit"));

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
  limit: state.register.limit
});

export default connect(mapStateToProps, { goBack, setUserExists, setLimit })(Details);
