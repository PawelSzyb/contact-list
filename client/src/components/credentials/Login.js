import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Row, Input, Button, Col, Container } from "react-materialize";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.isAuthenticated) {
      this.props.history.push("/contacts");
    }
  }

  onChangeHandle = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitHandle = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <Container>
        <Row
          style={{ display: "flex", justifyContent: "center", float: "none" }}
        >
          <Col s={12} m={8} l={6} style={{ margin: "20px auto" }}>
            <h3>Login</h3>
            <Input
              onChange={this.onChangeHandle}
              name="email"
              type="email"
              label="Email"
              s={12}
              error={errors.email ? errors.email : null}
            />
            <Input
              onChange={this.onChangeHandle}
              name="password"
              type="password"
              label="Password"
              s={12}
              error={errors.password ? errors.password : null}
            />
            <Button
              onClick={this.onSubmitHandle}
              waves="light"
              style={{ backgroundColor: "#b71c1c", marginTop: "30px" }}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
