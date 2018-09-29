import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  contacts: contactReducer,
  errors: errorReducer,
  credentials: authReducer
});
