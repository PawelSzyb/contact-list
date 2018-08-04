import React, { Component } from "react";
import { Row, Input, Button, Icon, Col, Container } from "react-materialize";

class ContactAdd extends Component {
  render() {
    return (
      <Container>
        <Row
          style={{ display: "flex", justifyContent: "center", float: "none" }}
        >
          <Col s={12} m={8} l={6} style={{ margin: "20px auto" }}>
            <Input s={12} label="Name" className="mt-4" />
            <Input s={12} type="email" label="Email" />
            <Input
              type="tel"
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              label="Number"
              s={12}
            />
            <Button
              type="submit"
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

export default ContactAdd;
