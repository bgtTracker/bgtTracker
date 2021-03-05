import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Registration from "./Components/Login/RegistrationPage.js";
import MainPage from "./Components/MainPage";
import "firebase/messaging";
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
import AuthService from "./api/AuthService";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//redux imports
import { connect } from "react-redux";

async function initPush() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker
      .register("../firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function (err) {
        console.log("Service worker registration failed, error:", err);
      });
  } else {
    console.log("not service worker in navigator");
  }
}

function InnerApp(props) {
  const [isAuth, setAuth] = React.useState(null);

  let prefersDarkMode = props.darkTheme;

  if (prefersDarkMode == null) {
    prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  }

  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light"
    },
    mainGradients: {
      pink: {
        backgroundImage: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
      },
      purpleRed: {
        backgroundImage: "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)"
      }
    }
  });

  React.useEffect(() => {
    (async () => setAuth(await AuthService.verifyUser()))();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            {(isAuth !== null && ((isAuth === true && <Redirect to="/app" />) || <Redirect to="/login" />)) || null}
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <AuthenticatedRoute path="/app" component={MainPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = state => ({
  darkTheme: state.theme.darkTheme
});

export default connect(mapStateToProps, {})(InnerApp);
