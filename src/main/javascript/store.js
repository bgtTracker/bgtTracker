import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer.js";

const initialState = {};

const middleware = [thunk];
const enhancers = [];

if (window && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));

export default store;
