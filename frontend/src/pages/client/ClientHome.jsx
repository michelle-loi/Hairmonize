import React from "react";
import NavigationBar from "../../components/navbar/NavBar"
import {Col, Container, Nav, Row, Tab} from 'react-bootstrap'
import UpcomingAppointments from "../../components/clienthome/upcomingAppointments";
import BookAppointments from "../../components/clienthome/BookAppointments";
import ViewPriceList from "../../components/clienthome/ViewPriceList";
import "./ClientHome.css"
import Footer from "../../components/footer/Footer";
// https://react-bootstrap.netlify.app/docs/components/tabs/

const clientHome = () => {
    return(
        <div className="clientHomePage">
            <NavigationBar />
            <div className="client-homepage-content">
                <Tab.Container id="sidebar" defaultActiveKey="upcoming">
                    <Row>
                        <Col sm={2}>
                            <div className="client-pill-color">
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="upcoming">Upcoming Appointments</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="book">Book Appointments</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="services">Price List</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>

                                {/*Upcoming appointments page*/}
                                <Tab.Pane eventKey="upcoming">
                                    <UpcomingAppointments/>
                                </Tab.Pane>

                                {/* Book Appointments Page */}
                                <Tab.Pane eventKey="book">
                                    <BookAppointments/>
                                </Tab.Pane>

                                {/* View Services */}
                                <Tab.Pane eventKey="services">
                                    <ViewPriceList/>
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

export default clientHome