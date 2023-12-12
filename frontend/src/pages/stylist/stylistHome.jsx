import React from "react";
import NavigationBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import StylistAppointment from "../../components/stylistHome/StylistAppointment";
import BookAppointments from "../../components/stylistHome/BookAppointments";
import "./StylistHome.css"
const stylistHome = () => {
    return(
        <div className="stylistHomePage">
            <NavigationBar/>
            <div className="stylist-homepage-content">
                <Tab.Container id="sidebar" defaultActiveKey="stylist-appointments">
                    <Row>
                        <Col sm={2}>
                            <div className="stylist-side-colors">
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="stylist-appointments">Upcoming Appointments</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="stylist-book">Book Appointment</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="stylist-clients">View Clients</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="stylist-services">Services</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="stylist-expenses">Expenses</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="stylist-orders">Orders</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="stylist-suppliers">Suppliers</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="stylist-inventory">Inventory</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="stylist-transactions">Transactions</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>

                                {/*Employees page*/}
                                <Tab.Pane eventKey="stylist-appointments">
                                    <StylistAppointment/>
                                </Tab.Pane>

                                <Tab.Pane eventKey="stylist-book">
                                    <BookAppointments/>
                                </Tab.Pane>

                                {/* clients page */}
                                <Tab.Pane eventKey="stylist-clients">
                                    clients
                                </Tab.Pane>

                                {/* Accounts page */}
                                <Tab.Pane eventKey="stylist-services">
                                    S
                                </Tab.Pane>

                                {/* Services page */}
                                <Tab.Pane eventKey="stylist-expenses">
                                    S

                                </Tab.Pane>

                                {/* Expenses page */}
                                <Tab.Pane eventKey="stylist-orders">
                                    E

                                </Tab.Pane>

                                {/* Suppliers page */}
                                <Tab.Pane eventKey="stylist-suppliers">
                                    Sup

                                </Tab.Pane>

                                {/* inventory page */}
                                <Tab.Pane eventKey="stylist-inventory">
                                    Client

                                </Tab.Pane>

                                {/* transaction page */}
                                <Tab.Pane eventKey="stylist-transactions">
                                    Trans

                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
            <Footer/>
        </div>
    )
}

export default stylistHome