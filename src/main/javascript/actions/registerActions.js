import { REGISTER_GO_BACK, REGISTER_NEXT_STEP, REGISTER_ADD_USER } from "./types.js";

export const nextStep = () => dispatch => {
  dispatch({
    type: REGISTER_NEXT_STEP
  });
};

export const goBack = () => dispatch => {
  dispatch({
    type: REGISTER_GO_BACK
  });
};

export const addUser = user => dispatch => {
  dispatch({
    type: REGISTER_ADD_USER,
    payload: user
  });
};
