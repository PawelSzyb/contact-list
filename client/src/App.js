import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";

import setAuthHeader from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import store from "./store";

import NavBar from "./components/layout/NavBar";
import ContactAdd from "./components/forms/ContactAdd";
import ContactList from "./components/contact-list/ContactList";
import EditForm from "./components/forms/EditForm";
import Register from "./components/credentials/Register";
import Login from "./components/credentials/Login";
import LandingPage from "./components/landing/LandingPage";
import Info from "./components/layout/Info";

class App extends Component {
  render() {
    // check for token
    if (localStorage.jwtToken) {
      // set auth header
      setAuthHeader(localStorage.jwtToken);
      // decode user info
      const decode = jwt_decode(localStorage.jwtToken);
      // set current user
      store.dispatch(setCurrentUser(decode));
    }
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar style={{ width: "100%" }} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/contacts" component={ContactList} />
            <Route exact path="/contact-add" component={ContactAdd} />
            <Route exact path="/contact-edit/:id" component={EditForm} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/info" component={Info} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
