import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  Collapsible,
  CollapsibleItem,
  Container,
  Icon
} from "react-materialize";

import "./ContactList.css";

import { getContacts, deleteContact } from "../../actions/contactActions";

class ContactList extends Component {
  state = {
    contacts: []
  };
  componentDidMount() {
    this.props.getContacts();
    setTimeout(
      () => this.setState({ contacts: this.props.contacts.contacts }),
      2000
    );
  }

  onDeleteClick(id) {
    this.props.deleteContact(id);
  }

  render() {
    const { contacts } = this.state;
    return (
      <div>
        <h3>
          <span style={{ color: "#B71C1C", marginLeft: "20px" }}>Contact</span>{" "}
          List
        </h3>
        <Container>
          {contacts !== undefined ? (
            contacts.map(contact => (
              <React.Fragment key={contact._id}>
                <Collapsible style={{ position: "relative" }}>
                  <Link
                    to={{ pathname: `/contact-edit/${contact._id}` }}
                    className="edit-icon"
                  >
                    <Icon>mode_edit</Icon>
                  </Link>
                  <div onClick={this.onDeleteClick.bind(this, contact._id)}>
                    <Icon className="delete-icon">delete_forever</Icon>
                  </div>
                  <CollapsibleItem header={contact.name} icon="place">
                    <span style={{ fontWeight: "bold" }}>Email: </span>
                    {contact.email}
                    <hr />
                    <span style={{ fontWeight: "bold" }}>Tel. Number: </span>
                    {contact.number}
                  </CollapsibleItem>
                </Collapsible>
              </React.Fragment>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </Container>
      </div>
    );
  }
}

ContactList.propTypes = {
  getContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contacts: state.contacts
});

export default connect(
  mapStateToProps,
  { getContacts, deleteContact }
)(ContactList);
