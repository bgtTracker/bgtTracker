import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import MainPage from "./Components/MainPage";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login"/>
                </Route>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                {/* TODO: replace with protected route once backend auth is done */}
                <Route path="/app" component={MainPage}/>
            </Switch>
        </Router>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);