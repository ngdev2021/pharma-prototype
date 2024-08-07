// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background-color: #343a40;
`;

const AppNavbar = () => {
  return (
    <StyledNavbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">Pharma Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/inventory">Inventory</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/suppliers">Suppliers</Nav.Link>
            <Nav.Link href="/fda-data">FDA Data</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default AppNavbar;
