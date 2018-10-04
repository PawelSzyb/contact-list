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
        payload: {}
      })
    );
};

export const addContact = (contactData, history) => dispatch => {
  axios
    .post("/api/contacts/create", contactData)
    .then(res => history.push("/contacts"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateContact = (id, contactData, history) => dispatch => {
  axios
    .post(`/api/contacts/edit/${id}`, contactData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteContact = id => dispatch => {
  axios
    .delete(`api/contacts/${id}`)
    .then(res => dispatch(getContacts()))
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
};
