import React from 'react';
import {Container, Row, Col, ListGroup} from 'react-bootstrap';
import "./Footer.css"

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <p className="hours">
                        Store Hours
                        <br/>
                        Monday: 9-5
                        <br/>
                        Tuesday: 9-5
                        <br/>
                        Wednesday: 9-5
                        <br/>
                        Thursday: 9-5
                        <br/>
                        Friday: 9-5
                        <br/>
                        Saturday: 9-5
                        <br/>
                        Sunday: Closed
                    </p>
                    <p>Copyright 2023 There Isn't Really One</p>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;