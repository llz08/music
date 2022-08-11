import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Login from "./login.jsx";

function Header({ getNewReleases }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Mini Player</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link onClick={getNewReleases}>Home</Nav.Link>
        </Navbar.Collapse>
        <Login />
      </Container>
    </Navbar>
  );
}

export default Header;
