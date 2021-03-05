import React from "react";
import ReactDOM from "react-dom";
import "firebase/messaging";
import { SnackbarProvider } from "notistack";

//redux imports
import { Provider } from "react-redux";
import store from "./store.js";

import InnerApp from "./innerApp.js";

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

function App(props) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={4}>
        <InnerApp />
      </SnackbarProvider>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

initPush();

export default App;
