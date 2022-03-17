import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../methods/auth";
import './navbar.style.css';

import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import lang from '../../../methods/language.js';

function NavBarView() {
  let auth = useAuth();
  let navigate = useNavigate();

  let tokenObj = JSON.parse(auth.token);
  let userObj = JSON.parse(auth.user);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="logo"
            src="https://mcskri.pt/img/logo/default_light.png"
            width="auto"
            height="50"
            className="d-inline-block align-top navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/search">{lang.navbar.search}</Nav.Link>
            <Nav.Link as={Link} to="/members">{lang.navbar.members}</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown {... {"title": !tokenObj.Token ? lang.navbar.dropdown.account : `${lang.navbar.dropdown.user}, ${userObj.FirstName}`}} id="nav-dropdown">
            {!tokenObj.Token ? (
              <>
                <NavDropdown.Item as={Link} to="/signin">{lang.navbar.dropdown.signin}</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/signup">{lang.navbar.dropdown.signup}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/pwreset">{lang.navbar.dropdown.pwreset}</NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdown.Item as={Link} to="/profile">{lang.navbar.dropdown.profile}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => auth.signout(() => navigate("/"))}>{lang.navbar.dropdown.signout}</NavDropdown.Item>
              </>
            )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBarView;