import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.jpg";
import "./CustomNavbar.css";

const CustomNavbar = () => {
  return (
    <Navbar bg="warning" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand-text">RestoFesto</span>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
