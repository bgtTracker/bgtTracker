import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import MainPage from "./Components/MainPage";
import firebase from "firebase/app";
import "firebase/messaging";
import clientJson from "./clientJson.js";
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
import AuthService from "./api/AuthService";
import { SnackbarProvider } from "notistack";

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
    <SnackbarProvider maxSnack={4}>
      <Router>
        <Switch>
          <Route exact path="/">
            {(isAuth !== null &&
              ((isAuth === true && <Redirect to="/app" />) || (
                <Redirect to="/login" />
              ))) ||
              null}
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <AuthenticatedRoute path="/app" component={MainPage} />
        </Switch>
      </Router>
    </SnackbarProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

initPush();
