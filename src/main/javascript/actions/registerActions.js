import { REGISTER_GO_BACK, REGISTER_NEXT_STEP } from "./types.js";

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
