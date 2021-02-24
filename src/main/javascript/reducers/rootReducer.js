import { combineReducers } from "redux";
import registerReducer from "./registerReducer.js";

export default combineReducers({
  register: registerReducer
});
