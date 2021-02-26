import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Registration from "./Components/Login/RegistrationPage.js";
import MainPage from "./Components/MainPage";
import firebase from "firebase/app";
import "firebase/messaging";
import clientJson from "./clientJson.js";
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
import AuthService from "./api/AuthService";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

//redux imports
import { Provider } from "react-redux";
import store from "./store.js";

const theme = createMuiTheme();

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

export default function App() {
  const [isAuth, setAuth] = React.useState(null);

  React.useEffect(() => {
    (async () => setAuth(await AuthService.verifyUser()))();
  }, []);

  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={4}>
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
      </SnackbarProvider>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

initPush();
