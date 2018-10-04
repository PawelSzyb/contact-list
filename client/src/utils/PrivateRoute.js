import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, credentials, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      credentials.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  credentials: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.credentials
});

export default connect(mapStateToProps)(PrivateRoute);
