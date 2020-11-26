import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from "react-router-dom";
import client from './client';
import Users from './Components/Users.js';
import Charts from './Components/Charts/Charts.js'


class App extends Component{


    render() {
        return (<Router>
        <div className='luuul'>
            <div className = ' lul'>
            <Route path="/" exact component = {Users}/>
            <Route path="/charts" exact component={Charts}/>
            </div>
        </div>
        </Router>
        )}
}   


ReactDOM.render(
    <App />,
    document.getElementById('react')
);