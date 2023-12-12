import React, {useState, useContext, useEffect} from "react";
import {Container, Dropdown, DropdownButton, Row, Col, Form, Button} from "react-bootstrap";
import {AuthContext} from "../../context/authContext";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const BookAppointments = () => {
    // const location = useLocation();
    // const navigate = useNavigate();

    const {currentUser} = useContext(AuthContext);
    const CID = currentUser.CID;
    const [stylistEID, setStylistEID] = useState(null);
    const [stylistName, setStylistName] = useState([]);
    const [stylistAppts, setStylistAppts] = useState([]);
    const [availableServices, setAvailableServices] = useState([]);

    const [dateSelected, setDateSelected] = useState('');
    const [timeSelected, setTimeSelected] = useState('');
    const [dateOptions, setDateOptions] = useState([]);
    const [timeOptions, setTimeOptions] = useState([]);
    const [serviceSelected, setServiceSelected] = useState('');


    useEffect(() => {
        const fetchStylistEID = async () => {
            try {
                const res = await axios.get(`/clientAppointment/getMyStylist/${CID}`);
                setStylistEID(res.data[0].EID);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStylistEID();
    }, []);
    //console.log(JSON.stringify(stylistEID));

    useEffect(() => {
        const fetchStylistName = async () => {
            try {
                const res = await axios.get(`/clientAppointment/getMyStylistName/${stylistEID}`);
                setStylistName(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStylistName();
    }, [stylistEID]);
    //console.log(JSON.stringify(stylistName));

    useEffect(() => {
        const fetchStylistAppts = async () => {
            try {
                const res = await axios.get(`/clientAppointment/getMyStylistAppts/${stylistEID}`);
                setStylistAppts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStylistAppts();
    }, [stylistEID]);
    console.log(stylistAppts);

    useEffect(() => {
        const fetchAvailableServices = async () => {
            try {
                const res = await axios.get(`/clientAppointment/getAvailableServices`);
                setAvailableServices(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAvailableServices ();
    }, []);
    //console.log(availableServices);


    //*************************** DATE/TIME *********************************
    useEffect(() => {
        const tomorrow = new Date();
        const endDate = new Date(tomorrow);
        endDate.setDate(tomorrow.getDate() + 30);

        const options = [];
        for (let date = new Date(tomorrow); date <= endDate; date.setDate(date.getDate() + 1)) {
            options.push(new Date(date));
        }
        setDateOptions(options);
    }, []);


    useEffect(() => {
        const options = [];
        const openingHour = 9;
        const closingHour = 16;

        for (let hour = openingHour; hour <= closingHour; hour++) {
            options.push(`${hour}:00:00`);
        }

        setTimeOptions(options);
    }, []);


    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDateSelected(selectedDate);
        //console.log(selectedDate)

        // Have to generate time options from 10 - 4 again in case the previous date selected resulted in some times being excluded
        const options = [];
        const openingHour = 10;
        const closingHour = 16;

        for (let hour = openingHour; hour <= closingHour; hour++) {
            options.push(`${hour}:00:00`);
        }


        const bookedTimes = stylistAppts
            .filter((appointment) => (appointment.Date || '').split('T')[0]=== selectedDate)
            .map((appointment) => appointment.Time);
        //console.log(bookedTimes)

        const availableTimes = options.filter((time) => !bookedTimes.includes(time));
        //console.log(availableTimes)
        setTimeOptions(availableTimes);
        setTimeSelected('');
    };

    const handleTimeChange = (e) => {
        setTimeSelected(e.target.value);
    };
    //**********************************************************************

    const addAppointment = async () => {
        try{
            await axios.post(`/clientAppointment/addAppointment`, {CID: CID, Date: dateSelected, Time: timeSelected, Stylist_EID: stylistEID, Service_SID: serviceSelected});
            //console.log("hi");
        } catch (err) {
            console.log(err);
        }
    }

    const handleBook = (e) => {
        e.preventDefault();
        addAppointment();

        window.location.reload();
    }




    return (
        <Container>
            <h1 className="mt-3">Book an appointment with your stylist</h1>

            <Form onSubmit={handleBook}>
                <Form.Group className="mb-3">
                    <Form.Label>Select date <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={dateSelected}
                        onChange={handleDateChange}
                        required
                    >
                        <option value="">Select a date</option>
                        {dateOptions.map((date) => (
                            <option key={date.toISOString()} value={date.toISOString().split('T')[0]}>
                                {date.toISOString().split('T')[0]}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select time <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={timeSelected}
                        onChange={handleTimeChange}
                        disabled={!dateSelected}
                        required
                    >
                        <option value="">Select a time</option>
                        {timeOptions.map((time) => (
                            <option key={time} value={time}>
                                {time.slice(0, -3)}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Service">
                    <Form.Label>Select service  <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={serviceSelected}
                        onChange={(e) => setServiceSelected(e.target.value)}
                        required
                    >
                        <option value=''>Select a service</option>
                        {availableServices.map((service, i)=>{
                            return(
                                <option value={service.SID}>{service.SName}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="success" style={{ marginRight: '10px' }}>
                    Book Appointment
                </Button>

            </Form>
        </Container>
    )
}

export default BookAppointments