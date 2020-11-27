import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from "react-router-dom";
import client from './client';
import Users from './Components/Users.js';
import Charts from './Components/Charts/Charts.js'
import History from './Components/History/History.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{


    render() {
        return (<Router>
        <div className='luuul'>
            <div className = ' lul'>
            <Route path="/" exact component = {Users}/>
            <Route path="/charts" exact component={Charts}/>
            <Route path="/history" exact component={History}/>
            </div>
        </div>
        </Router>
        )}
}   


ReactDOM.render(
    <App />,
    document.getElementById('react')
);