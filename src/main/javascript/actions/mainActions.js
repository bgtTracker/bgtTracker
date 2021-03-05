import { TOGGLE_OPEN_DRAWER } from "./types.js";

export const toggleOpenDraw = () => dispatch => {
  dispatch({
    type: TOGGLE_OPEN_DRAWER
  });
};
