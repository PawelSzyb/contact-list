import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Row, Input, Button, Col, Container } from "react-materialize";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };
  onChangeHandle = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitHandle = () => {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    return (
      <Container>
        <Row>
          <Col m={12} l={8} style={{ marginTop: "30px" }}>
            <Input
              onChange={this.onChangeHandle}
              name="name"
              s={12}
              label="First Name"
            />
            <Input
              onChange={this.onChangeHandle}
              name="email"
              type="email"
              label="Email"
              s={12}
            />
            <Input
              onChange={this.onChangeHandle}
              name="password"
              type="password"
              label="Password"
              s={12}
            />
            <Input
              onChange={this.onChangeHandle}
              name="password2"
              type="password"
              label="Confirm Password"
              s={12}
            />
            <Button
              onClick={this.onSubmitHandle}
              waves="light"
              style={{ backgroundColor: "#b71c1c" }}
            >
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
