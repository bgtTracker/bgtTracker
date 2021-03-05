import { THEME_CHANGE } from "../actions/types.js";

const findInitialState = () => {
  let item = localStorage.getItem("darkTheme");
  if (item == null) return null;
  return item == "true";
};

const initialState = {
  darkTheme: findInitialState()
};

export default function (state = initialState, action) {
  switch (action.type) {
    case THEME_CHANGE:
      return {
        ...state,
        darkTheme: action.payload
      };
    default:
      return state;
  }
}
