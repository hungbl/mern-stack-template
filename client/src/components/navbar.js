import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import fav from '../images/fav2.png'

const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img alt="logo" src={fav} width="30" height="30" className="d-inline-block aligh-top" />
                    &nbsp; League Predict
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Dasboard</NavLink>
                        {/* <NavLink className="nav-link" to="/">Pricing</NavLink> */}
                    </Nav>
                    <Nav>
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar