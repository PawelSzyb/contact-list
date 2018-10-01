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
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

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
    const { errors } = this.state;
    return (
      <Container>
        <Row
          style={{ display: "flex", justifyContent: "center", float: "none" }}
        >
          <h3>Register</h3>
          <Col s={12} m={8} l={6} style={{ margin: "20px auto" }}>
            <Input
              onChange={this.onChangeHandle}
              name="name"
              s={12}
              label="First Name"
              error={errors.name ? errors.name : null}
            />
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
            <Input
              onChange={this.onChangeHandle}
              name="password2"
              type="password"
              label="Confirm Password"
              s={12}
              error={errors.password2 ? errors.password2 : null}
            />
            <Button
              onClick={this.onSubmitHandle}
              waves="light"
              style={{ backgroundColor: "#b71c1c", marginTop: "30px" }}
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
