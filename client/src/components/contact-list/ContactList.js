import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Collapsible, CollapsibleItem, Container } from "react-materialize";

import { getContacts } from "../../actions/contactActions";

class ContactList extends Component {
  componentDidMount() {
    this.props.getContacts();
  }
  render() {
    const { contacts } = this.props.contacts;
    return (
      <div>
        <h3>
          <span style={{ color: "#B71C1C", marginLeft: "20px" }}>Contact</span>{" "}
          List
        </h3>
        {contacts.map(contact => (
          <Container>
            <Collapsible>
              <CollapsibleItem header={contact.name} icon="place">
                <span style={{ fontWeight: "bold" }}>Email: </span>
                {contact.email}
                <hr />
                <span style={{ fontWeight: "bold" }}>Tel. Number: </span>
                {contact.number}
              </CollapsibleItem>
            </Collapsible>
          </Container>
        ))}
      </div>
    );
  }
}

ContactList.propTypes = {
  getContacts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contacts: state.contacts
});

export default connect(
  mapStateToProps,
  { getContacts }
)(ContactList);
