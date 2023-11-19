import React from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import UpcomingAppointments from "../../components/clienthome/upcomingAppointments";
import BookAppointments from "../../components/clienthome/BookAppointments";
import NavigationBar from "../../components/navbar/NavBar"
import ViewEmployee from "../../components/adminHome/viewEmployee";
import ViewClients from "../../components/adminHome/viewClients";

// https://react-bootstrap.netlify.app/docs/components/tabs/

const adminHome = () => {
    return(
        <div className="adminHomePage">
            <NavigationBar/>
            <Tab.Container id="sidebar" defaultActiveKey="employees">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="employees">View Employees</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">View Clients</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="accounts">View Accounts</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="services">Services</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="expenses">Expenses</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="suppliers">Suppliers</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="inventory">Inventory</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>

                            {/*Employees page*/}
                            <Tab.Pane eventKey="employees">
                                <ViewEmployee/>
                            </Tab.Pane>

                            {/* clients page */}
                            <Tab.Pane eventKey="clients">
                                <ViewClients/>
                            </Tab.Pane>

                            {/* Accounts page */}
                            <Tab.Pane eventKey="accounts">
                                A
                            </Tab.Pane>

                            {/* Services page */}
                            <Tab.Pane eventKey="services">
                                S

                            </Tab.Pane>

                            {/* Expenses page */}
                            <Tab.Pane eventKey="expenses">
                                E

                            </Tab.Pane>

                            {/* Suppliers page */}
                            <Tab.Pane eventKey="suppliers">
                                Sup

                            </Tab.Pane>

                            {/* inventory page */}
                            <Tab.Pane eventKey="inventory">
                                Client

                            </Tab.Pane>

                            {/* transaction page */}
                            <Tab.Pane eventKey="transactions">
                                Trans

                            </Tab.Pane>






                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>

    )
}

export default adminHome