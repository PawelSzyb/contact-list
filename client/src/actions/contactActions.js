import { GET_CONTACTS, ADD_CONTACTS, GET_ERRORS } from "./types";
import axios from "axios";

export const getContacts = () => {
  return {};
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
