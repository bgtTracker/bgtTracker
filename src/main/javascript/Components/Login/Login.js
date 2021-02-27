import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import AuthService, { UserCredentials } from "../../api/AuthService";
import { PinkGradientButton } from "../Misc/ColoredButtons.js";
import ChangeTitle from "../ChangeTitle";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login() {
  const classes = useStyles();
  const theme = useTheme();
  const avatarWithPinkGradientClass = clsx(classes.avatar, theme.mainGradients.pink);
  const history = useHistory();
  const [isError, setError] = React.useState(false);

  const onSubmit = async event => {
    event.preventDefault();

    AuthService.permanentStorage(document.getElementById("remember").checked);

    let creds = new UserCredentials(document.getElementById("email").value, document.getElementById("password").value);

    try {
      setError(false);
      await AuthService.login(creds);
      history.push("/app");
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ChangeTitle title="Sign in - bgtTracker" />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={avatarWithPinkGradientClass}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={isError}
            helperText={isError ? "Invalid email or password" : undefined}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={isError}
            helperText={isError ? "Invalid email or password" : undefined}
          />
          <FormControlLabel control={<Checkbox name="remember" id="remember" color="primary" />} label="Remember me" />
          <PinkGradientButton type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </PinkGradientButton>
        </form>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
