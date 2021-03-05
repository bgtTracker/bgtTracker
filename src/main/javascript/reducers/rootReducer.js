import { combineReducers } from "redux";
import registerReducer from "./registerReducer.js";
import themeReducer from "./themeReducer.js";
import mainReducer from "./mainReducer.js";

export default combineReducers({
  register: registerReducer,
  theme: themeReducer,
  main: mainReducer
});
