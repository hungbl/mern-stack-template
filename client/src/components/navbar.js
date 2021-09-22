import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import fav from '../images/fav2.png'
import { authSelector } from '../slices/auth'

const NavBar = () => {
    const { authenticated, user } = useSelector(authSelector)
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
                        <NavLink className="nav-link" to="/">Dashboard</NavLink>
                        {
                            authenticated && user &&
                            <NavLink className="nav-link" to="/">Your Prediction</NavLink>

                        }
                    </Nav>
                    {
                        authenticated && user
                            ? <Nav>
                                <NavLink className="nav-link" to="/login">Logout <span style={{ color: 'green' }}>{user.name}</span></NavLink>
                            </Nav>
                            : <Nav>
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar