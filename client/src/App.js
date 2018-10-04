import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";

import setAuthHeader from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import PrivateRoute from "./utils/PrivateRoute";

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

      // logout if time pass exp
      const currTime = Date.now() / 1000;
      if (decode.exp < currTime) {
        store.dispatch(logoutUser());
        store.dispatch(setCurrentUser({}));
        window.location.href = "/login";
      }
    }
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar style={{ width: "100%" }} />
            <Route exact path="/" component={LandingPage} />
            <Switch>
              <PrivateRoute exact path="/contacts" component={ContactList} />
              <PrivateRoute exact path="/contact-add" component={ContactAdd} />
              <PrivateRoute
                exact
                path="/contact-edit/:id"
                component={EditForm}
              />
            </Switch>
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
