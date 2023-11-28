import React, {useContext} from "react";
import { FaUser } from "react-icons/fa";
import { LuScissorsSquare } from "react-icons/lu";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./navBar.css"
import {AuthContext} from "../../context/authContext";

// Documentation:
// https://react-bootstrap.netlify.app/docs/components/navbar/


// Function for the navigation bar
const NavBar = () => {

    // getting the current user and logout function from AuthContext so we can enable the logout button
    const {currentUser, logout} = useContext(AuthContext);

    return(
        <Navbar fluid={""} bg="dark-subtle" data-bs-theme="dark" sticky="top" className="navi">
            <Container fluid={""}>

                {/*Home button*/}
                {currentUser?.AccountType === 2 && ( // administrator
                    <Navbar.Brand href="/adminHome">
                        <div className="square">
                            <LuScissorsSquare className="scissorIcon" />
                        </div>
                    </Navbar.Brand>
                )}

                {currentUser?.AccountType === 1 && ( // client
                    <Navbar.Brand href="/clientHome">
                        <div className="square">
                            <LuScissorsSquare className="scissorIcon" />
                        </div>
                    </Navbar.Brand>
                )}

                {currentUser?.AccountType === 0 && ( // employee
                    <Navbar.Brand href="/stylistHome">
                        <div className="square">
                            <LuScissorsSquare className="scissorIcon" />
                        </div>
                    </Navbar.Brand>
                )}

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
                            <NavDropdown.Item onClick={logout} href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar