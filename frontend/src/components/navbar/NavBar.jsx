import React from "react";
import { FaUser } from "react-icons/fa";
import { LuScissorsSquare } from "react-icons/lu";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./navBar.css"

// Documentation:
// https://react-bootstrap.netlify.app/docs/components/navbar/


// Function for the navigation bar
const navBar = () => {
    return(
        <Navbar fluid bg="dark-subtle" data-bs-theme="dark" sticky="top" className="navi">
            <Container fluid={""}>

                {/*Home button*/}
                <Navbar.Brand href="/clientHome">
                    <div className="square">
                        <LuScissorsSquare className="scissorIcon"/>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {/* User profile image */}
                    <Nav className="ms-auto">

                        {/* Title is the account icon*/}
                        <NavDropdown
                            align="end"
                            title={
                            <div className="circle">
                                <FaUser className="accountIcon"/>
                            </div>
                            }
                            id="basic-nav-dropdown"
                            className="remove-arrow"
                        >
                            <NavDropdown.Item href="/account">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default navBar