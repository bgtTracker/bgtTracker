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
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
import AuthService from "./api/AuthService";

export default function App() {
  const [isAuth, setAuth] = React.useState(null);

  React.useEffect(() => {
    (async () => setAuth(await AuthService.verifyUser()))();
  }, []);

  return (
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
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
