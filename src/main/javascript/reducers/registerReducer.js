import {
  REGISTER_GO_BACK,
  REGISTER_NEXT_STEP,
  REGISTER_ADD_USER,
  REGISTER_SET_LIMIT,
  REGISTER_SET_USER_EXIST
} from "../actions/types.js";

const initialState = {
  step: 0,
  user: undefined,
  limit: 3000,
  userExists: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_GO_BACK:
      if (state.step !== 0) {
        return {
          ...state,
          step: state.step - 1
        };
      }
    case REGISTER_NEXT_STEP:
      return {
        ...state,
        step: state.step + 1
      };
    case REGISTER_ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case REGISTER_SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case REGISTER_SET_USER_EXIST:
      return {
        ...state,
        userExists: action.payload
      };
    default:
      return state;
  }
}
