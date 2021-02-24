import { REGISTER_GO_BACK, REGISTER_NEXT_STEP } from "../actions/types.js";
const initialState = {
  step: 0
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
    default:
      return state;
  }
}
