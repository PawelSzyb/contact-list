import { REGISTER_USER } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
}
