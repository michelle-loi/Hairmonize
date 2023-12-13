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
                        <h4>Store Hours</h4>
                        Monday: 10-4
                        <br/>
                        Tuesday: 10-4
                        <br/>
                        Wednesday: 10-4
                        <br/>
                        Thursday: 10-4
                        <br/>
                        Friday: 10-4
                        <br/>
                        Saturday: 10-4
                        <br/>
                        Sunday: 10-4
                    </p>
                    <p>Copyright 2023 There Isn't Really One</p>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;