import React, {useState} from "react";
import {Container, Dropdown, DropdownButton, Row} from "react-bootstrap";

const BookAppointments = () => {


    // Initial view
    const [currentState, updateState] = useState("");

    // handle click on dropdown
    const handleSelect = (eventKey) => {
        updateState(eventKey);
    }


    return (
        <Container>
            <h1 className="mt-3">Book Appointments</h1>
            <Row>
                <h3> Select the stylist from the dropdown menu</h3>
                <DropdownButton
                    id="stylists"
                    title={currentState || "Stylists"}
                    onSelect={handleSelect}
                >
                    <Dropdown.Item eventKey="Stylist 1">Stylist 1</Dropdown.Item>
                    <Dropdown.Item eventKey="Stylist 2">Stylist 2</Dropdown.Item>
                    <Dropdown.Item eventKey="Stylist 3">Stylist 3</Dropdown.Item>
                </DropdownButton>
            </Row>

        </Container>
    )
}

export default BookAppointments