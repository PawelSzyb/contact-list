import { GET_CONTACTS, GET_ERRORS } from "./types";
import axios from "axios";

export const getContacts = () => dispatch => {
  axios
    .get("/api/contacts")
    .then(res =>
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CONTACTS,
        payload: null
      })
    );
};

export const addContact = (contactData, history) => dispatch => {
  axios
    .post("/api/contacts/create", contactData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
