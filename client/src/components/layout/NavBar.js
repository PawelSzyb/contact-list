import React, { Component } from "react";
import { Navbar, NavItem, Icon } from "react-materialize";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <Navbar brand="Contact Manager" className="navbar" right>
        <div className="navbar-content">
          <NavLink className="nav-link" to="/">
            <Icon large>home</Icon>home
          </NavLink>
          <NavLink className="nav-link" to="/">
            <Icon large>add</Icon>add
          </NavLink>
          <NavLink className="nav-link" to="/">
            <Icon large>info_outline</Icon>info
          </NavLink>
        </div>
      </Navbar>
    );
  }
}

export default NavBar;
