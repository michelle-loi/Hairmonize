import React from "react";
import Logo from "../assets/logo.png"
import { FaUser } from "react-icons/fa";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./navigationBar.css"

const navigationBar = () => {
    return(
        <Navbar fluid className="bg-body-tertiary" bg="dark" data-bs-theme="dark" sticky="top" >
            <Container fluid>

                {/*Home button*/}
                <Navbar.Brand href="/clientHome"><img src={Logo} height="35" alt="hsd"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {/* User profile image */}
                    <Nav className="ms-auto">
                        <NavDropdown align="end" title={<FaUser/>} id="basic-nav-dropdown" className="remove-arrow">
                            <NavDropdown.Item href="/account">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default navigationBar