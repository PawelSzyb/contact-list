import React, { Component } from "react";
import { Navbar, Icon } from "react-materialize";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";

import "./NavBar.css";

class NavBar extends Component {
  onClickHandle = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };
  render() {
    const { isAuthenticated } = this.props.credentials;
    const authLinks = (
      <div className="navbar-content">
        <NavLink className="nav-link" to="/contacts">
          <Icon large>view_list</Icon>
          Contacts
        </NavLink>
        <NavLink
          style={{ width: "120px" }}
          className="nav-link"
          to="/contact-add"
        >
          <Icon large>add</Icon>
          Add
        </NavLink>
        <NavLink className="nav-link" to="/" onClick={this.onClickHandle}>
          <Icon large>exit_to_app</Icon>
          Logout
        </NavLink>
      </div>
    );
    const guestLinks = (
      <div className="navbar-content">
        <NavLink className="nav-link" to="/">
          <Icon large>home</Icon>
          Home
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
    );
    return (
      <Navbar brand="Contact Manager" className="navbar" right>
        {isAuthenticated ? authLinks : guestLinks}
      </Navbar>
    );
  }
}

Navbar.PropTypes = {
  logoutUser: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.credentials
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(NavBar));
