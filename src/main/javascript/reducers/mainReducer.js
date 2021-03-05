import { TOGGLE_OPEN_DRAWER } from "../actions/types.js";

const initialState = {
  drawerOpen: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_OPEN_DRAWER:
      let newDrawerOpen = !state.drawerOpen;
      return {
        ...state,
        drawerOpen: newDrawerOpen
      };
    default:
      return state;
  }
}
