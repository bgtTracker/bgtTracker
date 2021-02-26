import {
  REGISTER_GO_BACK,
  REGISTER_NEXT_STEP,
  REGISTER_ADD_USER,
  REGISTER_SET_LIMIT,
  REGISTER_SET_USER_EXIST,
  REGISTER_SET_REMINDER_TIME,
  REGISTER_SET_SEND_REMINDER
} from "./types.js";
// import AuthService from "../api/AuthService.js";
// import ErrorCodeHandler from "../Components/ErrorCodeHandler.js";

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

export const setLimit = limit => dispatch => {
  dispatch({
    type: REGISTER_SET_LIMIT,
    payload: limit
  });
};

export const setUserExists = exists => dispatch => {
  if (exists === true) {
    dispatch({
      type: REGISTER_GO_BACK
    });
  }
  dispatch({
    type: REGISTER_SET_USER_EXIST,
    payload: exists
  });
};

export const setReminderTime = time => dispatch => {
  dispatch({
    type: REGISTER_SET_REMINDER_TIME,
    payload: time
  });
};

export const setSendReminder = send => dispatch => {
  dispatch({
    type: REGISTER_SET_SEND_REMINDER,
    payload: send
  });
};
