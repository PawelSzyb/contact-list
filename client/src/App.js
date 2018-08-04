import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/layout/NavBar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar style={{ width: "100%" }} />
          <Route exact path="/" />
        </div>
      </Router>
    );
  }
}

export default App;
