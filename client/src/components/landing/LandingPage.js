import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class LandingPage extends Component {
  componentWillMount() {
    if (this.props.credentials.isAuthenticated) {
      this.props.history.push("/contacts");
    }
  }
  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", marginTop: "60px" }}>
          Welcome to <span style={{ color: "rgb(183, 28, 28)" }}>Contact </span>
          Manager
        </h2>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Link
            style={{ backgroundColor: "#b71c1c", margin: "30px 20px 0 0" }}
            className="waves-effect waves-light btn"
            to="/login"
          >
            Login
          </Link>
          <Link
            style={{ backgroundColor: "#b71c1c", marginTop: "30px" }}
            className="waves-effect waves-light btn"
            to="/Register"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  credentials: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.credentials
});

export default connect(mapStateToProps)(withRouter(LandingPage));
