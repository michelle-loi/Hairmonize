import React from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import UpcomingAppointments from "../../components/clienthome/upcomingAppointments";
import BookAppointments from "../../components/clienthome/BookAppointments";
import NavigationBar from "../../components/navbar/NavBar"
//import ViewEmployee from "../../components/adminHome/viewEmployee";
import ViewClients from "../../components/adminHome/viewClients";
import ViewAccounts from "../../components/adminHome/Accounts/viewAccounts";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import ViewServices from "../../components/adminHome/Services/ViewServices";
import ViewTransactions from "../../components/adminHome/Transactions/ViewTransactions";
import ViewSuppliers from "../../components/adminHome/Suppliers/ViewSuppliers";
import ViewExpenses from "../../components/adminHome/Expenses/ViewExpenses";
import ViewOrders from "../../components/adminHome/Orders/ViewOrders";
import ViewInventory from "../../components/adminHome/Inventory/viewInventory"
import ViewSupplies from "../../components/adminHome/Supplies/viewSupplies";
import Footer from "../../components/footer/Footer";

import ViewEmployeeAS from "../../components/adminStylistHome/Employee/viewEmployeeAS";
import ViewClientsAS from "../../components/adminStylistHome/Client/viewClientsAS";

import "./adminStylistHome.css"

// https://react-bootstrap.netlify.app/docs/components/tabs/

const adminStylistHome = () => {
    return(
        <div className="admin-stylist-homepage">
            <NavigationBar/>
            <div className="admin-stylist-homepage-content">
                <Tab.Container id="admin-stylist-sidebar" defaultActiveKey="as-upcoming">
                    <Row>
                        <Col sm={2}>
                            <div className="as-pill-colors">
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-upcoming">Upcoming Appointments</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-book">Book Appointments</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-employees">Employees</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-clients">Clients</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-accounts">Accounts</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-services">Services</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-expenses">Expenses</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-orders">Orders</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-suppliers">Suppliers</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-supplies">Supplies</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-inventory">Inventory</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="as-transactions">Transactions</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>

                                {/* Upcoming appointments page*/}
                                <Tab.Pane eventKey="as-upcoming">
                                    <UpcomingAppointments/>
                                </Tab.Pane>

                                {/* Book appointments page */}
                                <Tab.Pane eventKey="as-book">
                                    <BookAppointments/>
                                </Tab.Pane>

                                {/*Employees page*/}
                                <Tab.Pane eventKey="as-employees">
                                    <ViewEmployeeAS/>
                                </Tab.Pane>

                                {/* clients page */}
                                <Tab.Pane eventKey="as-clients">
                                    <ViewClientsAS/>
                                </Tab.Pane>

                                {/* Accounts page */}
                                <Tab.Pane eventKey="as-accounts">
                                    <ViewAccounts/>
                                </Tab.Pane>

                                {/* Services page */}
                                <Tab.Pane eventKey="as-services">
                                    <ViewServices/>
                                </Tab.Pane>

                                {/* Expenses page */}
                                <Tab.Pane eventKey="as-expenses">
                                    <ViewExpenses/>

                                </Tab.Pane>

                                {/* Orders page */}
                                <Tab.Pane eventKey="as-orders">
                                    <ViewOrders/>
                                </Tab.Pane>


                                {/* Suppliers page */}
                                <Tab.Pane eventKey="as-suppliers">
                                    <ViewSuppliers/>
                                </Tab.Pane>

                                <Tab.Pane eventKey="as-supplies">
                                    <ViewSupplies/>
                                </Tab.Pane>

                                {/* inventory page */}
                                <Tab.Pane eventKey="as-inventory">
                                    <ViewInventory/>

                                </Tab.Pane>

                                {/* transaction page */}
                                <Tab.Pane eventKey="as-transactions">
                                    <ViewTransactions/>
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

export default adminStylistHome