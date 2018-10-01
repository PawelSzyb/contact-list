import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import NavBar from "./components/layout/NavBar";
import ContactAdd from "./components/forms/ContactAdd";
import ContactList from "./components/contact-list/ContactList";
import EditForm from "./components/forms/EditForm";
import Register from "./components/credentials/Register";
import Login from "./components/credentials/Login";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar style={{ width: "100%" }} />
            <Route exact path="/" component={ContactList} />
            <Route exact path="/contact-add" component={ContactAdd} />
            <Route exact path="/contact-edit/:id" component={EditForm} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
