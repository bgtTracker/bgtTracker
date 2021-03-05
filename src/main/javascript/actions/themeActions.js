import { THEME_CHANGE } from "./types.js";

export const changeTheme = newTheme => dispatch => {
  console.log("Changing theme to " + newTheme);
  localStorage.setItem("darkTheme", newTheme);
  dispatch({
    type: THEME_CHANGE,
    payload: newTheme
  });
};
