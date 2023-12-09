import React from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import UpcomingAppointments from "../../components/clienthome/upcomingAppointments";
import BookAppointments from "../../components/clienthome/BookAppointments";
import NavigationBar from "../../components/navbar/NavBar"
import ViewEmployee from "../../components/adminHome/viewEmployee";
import ViewClients from "../../components/adminHome/viewClients";
import ViewAccounts from "../../components/adminHome/Accounts/viewAccounts";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import ViewServices from "../../components/adminHome/Services/ViewServices";
import ViewTransactions from "../../components/adminHome/Transactions/ViewTransactions";
import ViewSuppliers from "../../components/adminHome/Suppliers/ViewSuppliers";
import ViewOrders from "../../components/adminHome/Orders/ViewOrders";

// https://react-bootstrap.netlify.app/docs/components/tabs/

const adminHome = () => {
    return(
        <>

        <div className="adminHomePage">
            <NavigationBar/>
            <Tab.Container id="sidebar" defaultActiveKey="employees">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="employees">Employees</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Clients</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="accounts">Accounts</Nav.Link>
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
                                <ViewAccounts/>
                            </Tab.Pane>

                            {/* Services page */}
                            <Tab.Pane eventKey="services">
                                <ViewServices/>
                            </Tab.Pane>

                            {/* Expenses page */}
                            <Tab.Pane eventKey="expenses">
                                E

                            </Tab.Pane>

                            {/* Orders page */}
                            <Tab.Pane eventKey="orders">
                                <ViewOrders/>
                            </Tab.Pane>


                            {/* Suppliers page */}
                            <Tab.Pane eventKey="suppliers">
                                <ViewSuppliers/>
                            </Tab.Pane>

                            {/* inventory page */}
                            <Tab.Pane eventKey="inventory">
                                Client

                            </Tab.Pane>

                            {/* transaction page */}
                            <Tab.Pane eventKey="transactions">
                                <ViewTransactions/>
                            </Tab.Pane>






                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>


            </>

    )
}

export default adminHome