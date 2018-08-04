import { GET_CONTACTS } from "../actions/types";

const initialState = {
  users: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
