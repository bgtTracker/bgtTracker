import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../api/AuthService';

export default function AuthenticatedRoute(props) {
    if (AuthService.isUserLoggedIn()) {
        return <Route {...props}/>;
    } else {
        return <Redirect to="/login"/>;
    }
}