import React, {useContext} from 'react';
import {Container, Row} from 'react-bootstrap';
import "./Footer.css"
import {AuthContext} from "../../context/authContext";

function Footer() {

    const {currentUser} = useContext(AuthContext);

    // create default to prevent logout error
    const user = currentUser || { AccountType: '' };

    const footerColor = () => {
        switch (user.AccountType){
            case 0:
                return 'stylist-footer';
            case 1:
                return 'client-footer';
            case 2:
                return 'admin-footer';
            case 3:
                return 'admin-stylist-footer'
            default:
                return '';
        }
    };

    return (
        <footer className={footerColor()}>
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