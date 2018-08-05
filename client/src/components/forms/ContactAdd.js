import React, { Component } from "react";
import { Row, Input, Button, Icon, Col, Container } from "react-materialize";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addContact } from "../../actions/contactActions";

import "../../App.css";

class ContactAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      number: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitClick() {
    const contactData = {
      name: this.state.name,
      email: this.state.email,
      number: this.state.number
    };
    this.props.addContact(contactData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <Container>
        <Row
          style={{ display: "flex", justifyContent: "center", float: "none" }}
        >
          <Col s={12} m={8} l={6} style={{ margin: "20px auto" }}>
            <Input
              s={12}
              name="name"
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name ? errors.name : null}
              placeholder=""
              label="Name"
            />
            <Input
              s={12}
              name="email"
              type="email"
              label="Email"
              placeholder=""
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email ? errors.email : null}
            />
            <Input
              type="text"
              name="number"
              placeholder=""
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              label="Number"
              s={12}
              onChange={this.onChange}
              value={this.state.number}
              error={errors.number ? errors.number : null}
            />
            <Button
              type="submit"
              onClick={this.onSubmitClick}
              waves="light"
              style={{ backgroundColor: "#b71c1c", marginTop: "20px" }}
            >
              Add<Icon right>add</Icon>
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

ContactAdd.propTypes = {
  addContact: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addContact }
)(withRouter(ContactAdd));
