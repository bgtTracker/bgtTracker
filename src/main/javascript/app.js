import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import MainPage from "./Components/MainPage";
import firebase from 'firebase/app';
import 'firebase/messaging';

async function initPush()
{
    if ("serviceWorker" in navigator)
    {
        const registration = await navigator.serviceWorker.register('../firebase-messaging-sw.js').then(function(registration) {
            console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function(err) {
            console.log("Service worker registration failed, error:", err);
        });

        const initializedFirebaseApp = firebase.initializeApp({
            apiKey: "AIzaSyCoy2KVfE3CotDEwJk5X5xbkA0HMa0O5L0",
            authDomain: "bgttracket.firebaseapp.com",
            projectId: "bgttracket",
            storageBucket: "bgttracket.appspot.com",
            messagingSenderId: "487395361382",
            appId: "1:487395361382:web:9b492dcbfa3b77339923a7"
        });
        const messaging = firebase.messaging();
        // messaging.usePublicVapidKey('BAxFZLrrh8nZ_BmuUYpkYjL3s6plsYNWZjou86Fys3w1zfZThBjmR3Kv12D5nP8B2Wv8VKS_SGY0NF9rOkSXt4M');
        // messaging.useServiceWorker(registration);	

        console.log("Data");
        console.log(messaging);

        try{
            const currentToken = await messaging.getToken({
                vapidKey: 'BAxFZLrrh8nZ_BmuUYpkYjL3s6plsYNWZjou86Fys3w1zfZThBjmR3Kv12D5nP8B2Wv8VKS_SGY0NF9rOkSXt4M',
            });
            console.log("Token: " + currentToken);
            fetch('/register', { method: 'post', body: currentToken });
        }catch (e) {
            console.log('somthing went wrong', e);
            return;

        }
    }
    else {
        console.log('not service worker in navigator');
    }
}

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

initPush();
