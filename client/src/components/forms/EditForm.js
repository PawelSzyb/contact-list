import React, { Component } from "react";
import { Row, Input, Button, Icon, Col, Container } from "react-materialize";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateContact } from "../../actions/contactActions";

class EditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      number: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitClick(id) {
    const contactData = {
      name: this.state.name,
      email: this.state.email,
      number: this.state.number
    };
    this.props.updateContact(id, contactData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    const { id } = this.props.match.params;
    return (
      <Container>
        <Row
          style={{ display: "flex", justifyContent: "center", float: "none" }}
        >
          <Col s={12} m={8} l={6} style={{ margin: "20px auto" }}>
            <h3>
              <span style={{ color: "rgb(183, 28, 28)" }}>Edit </span>
              Contact
            </h3>
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
              onClick={this.onSubmitClick.bind(this, id)}
              waves="light"
              style={{ backgroundColor: "#b71c1c", marginTop: "20px" }}
            >
              Edit<Icon right>mode_edit</Icon>
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

EditForm.propTypes = {
  updateContact: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateContact }
)(EditForm);
