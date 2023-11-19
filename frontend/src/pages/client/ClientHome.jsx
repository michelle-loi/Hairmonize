import React from "react";
import NavigationBar from "../../components/navbar/NavBar"
import {Col, Container, Nav, Row, Tab} from 'react-bootstrap'
import UpcomingAppointments from "../../components/clienthome/upcomingAppointments";
import BookAppointments from "../../components/clienthome/BookAppointments";

// https://react-bootstrap.netlify.app/docs/components/tabs/

const clientHome = () => {
    return(
        <div className="clientHomePage">
            <NavigationBar />
            <Tab.Container id="sidebar" defaultActiveKey="upcoming">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="upcoming">Upcoming Appointments</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="book">Book Appointments</Nav.Link>
                            </Nav.Item>
                        </Nav>
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
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default clientHome