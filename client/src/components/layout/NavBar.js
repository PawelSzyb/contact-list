import React, { Component } from "react";
import { Navbar, Icon } from "react-materialize";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

class NavBar extends Component {
  // <div className="navbar-content">
  //         <NavLink className="nav-link" to="/">
  //           <Icon large>home</Icon>home
  //         </NavLink>
  //         <NavLink className="nav-link" to="/contact-add">
  //           <Icon large>add</Icon>add
  //         </NavLink>
  //         <NavLink className="nav-link" to="/">
  //           <Icon large>info_outline</Icon>info
  //         </NavLink>
  render() {
    return (
      <Navbar brand="Contact Manager" className="navbar" right>
        <div className="navbar-content">
          <NavLink className="nav-link" to="/">
            <Icon large>home</Icon>
            home
          </NavLink>
          <NavLink className="nav-link" to="/login">
            <Icon large>account_circle</Icon>
            Login
          </NavLink>
          <NavLink className="nav-link" to="/register">
            <Icon large>screen_share</Icon>
            Register
          </NavLink>
          <NavLink className="nav-link" to="/info">
            <Icon large>info_outline</Icon>
            info
          </NavLink>
        </div>
      </Navbar>
    );
  }
}

export default NavBar;
