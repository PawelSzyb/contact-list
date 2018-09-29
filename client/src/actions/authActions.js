import { REGISTER_USER, GET_ERRORS } from "./types";
import axios from "axios";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res =>
      dispatch({
        type: REGISTER_USER,
        payload: res.data
      })
    )
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
