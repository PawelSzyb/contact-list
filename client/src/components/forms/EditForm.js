import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Icon, Col, Container } from 'react-materialize';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

import isEmpty from '../is-empty/IsEmpty';

import {
  updateContact,
  getContacts,
  clearErrors
} from '../../actions/contactActions';

class EditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      number: '',
      errors: {}
    };
  }

  onSubmitHandle = (values, actions) => {
    const contactData = {
      name: values.name,
      email: values.email,
      number: values.number
    };
    const { id } = this.props.match.params;
    this.props.updateContact(id, contactData, this.props.history);
    actions.setSubmitting(false);
  };

  componentDidMount() {
    this.props.getContacts();
    this.props.clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.contacts.contacts) {
      const { id } = this.props.match.params;
      const { contacts } = nextProps.contacts;
      const contact = contacts.filter((contact) => contact._id === id);

      contact[0].name = !isEmpty(contact[0].name) ? contact[0].name : '';
      contact[0].email = !isEmpty(contact[0].email) ? contact[0].email : '';
      contact[0].number = !isEmpty(contact[0].number) ? contact[0].number : '';
      this.setState({
        name: contact[0].name,
        email: contact[0].email,
        number: contact[0].number
      });
    }
  }
  render() {
    const { errors } = this.state;

    return (
      <Container>
        <Row
          style={{ display: 'flex', justifyContent: 'center', float: 'none' }}
        >
          <Col s={12} m={8} l={6} style={{ margin: '20px auto' }}>
            <h3>
              <span style={{ color: 'rgb(183, 28, 28)' }}>Edit </span>
              Contact
            </h3>
            <Formik
              initialValues={{
                name: this.state.name,
                email: this.state.email,
                number: this.state.number
              }}
              enableReinitialize={true}
              onSubmit={(values, actions) =>
                this.onSubmitHandle(values, actions)
              }
            >
              {({ values, handleChange, handleSubmit }) => (
                <Fragment>
                  <Form onSubmit={handleSubmit}>
                    <Input
                      s={12}
                      name='name'
                      onChange={handleChange}
                      value={values.name}
                      error={errors.name ? errors.name : null}
                      placeholder='Name'
                      label='Name'
                    />
                    <Input
                      s={12}
                      name='email'
                      type='email'
                      label='Email'
                      placeholder='Email'
                      onChange={handleChange}
                      value={values.email}
                      error={errors.email ? errors.email : null}
                    />
                    <Input
                      type='text'
                      name='number'
                      placeholder='Number'
                      pattern='[0-9]{3}[0-9]{3}[0-9]{3}'
                      label='Number'
                      s={12}
                      onChange={handleChange}
                      value={values.number}
                      error={errors.number ? errors.number : null}
                    />
                    <Button
                      type='submit'
                      waves='light'
                      style={{ backgroundColor: '#b71c1c', marginTop: '20px' }}
                    >
                      Edit
                      <Icon right>mode_edit</Icon>
                    </Button>
                  </Form>
                </Fragment>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  }
}

EditForm.propTypes = {
  updateContact: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  contacts: state.contacts
});

export default connect(
  mapStateToProps,
  { updateContact, getContacts, clearErrors }
)(withRouter(EditForm));
