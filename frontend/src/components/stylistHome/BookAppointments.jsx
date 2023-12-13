import React, {useState, useContext, useEffect} from "react";
import {Container, Dropdown, DropdownButton, Row, Col, Form, Button} from "react-bootstrap";
import {AuthContext} from "../../context/authContext";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const BookAppointments = () => {
    // const location = useLocation();
    // const navigate = useNavigate();

    const {currentUser} = useContext(AuthContext);
   // const EID = currentUser.EID;
    const EID = currentUser?.EID || '';

    const [availableServices, setAvailableServices] = useState([]);

    const [dateSelected, setDateSelected] = useState('');
    const [timeSelected, setTimeSelected] = useState('');
    const [dateOptions, setDateOptions] = useState([]);
    const [timeOptions, setTimeOptions] = useState([]);
    const [serviceSelected, setServiceSelected] = useState('');

    const [myAppts, setMyAppts] = useState([]);


    useEffect(() => {
        const fetchMyAppts = async () => {
            try {
                const res = await axios.get(`/stylist/getMyAppts/${EID}`);
                setMyAppts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMyAppts();
    }, [EID]);
    //console.log(myAppts);

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

    //*************************** MY CLIENTS *********************************
    const [myClients, setMyClients] = useState([]);
    const [clientSelected, setClientSelected] = useState(null);

    useEffect(() => {
        const fetchMyClients = async () => {
            try {
                const res = await axios.get(`/stylist/getMyClients/${EID}`);
                setMyClients(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMyClients();
    }, []);
    console.log(myClients);

    //**********************************************************************


    //*************************** DATE/TIME *********************************
    /**
     * The following useEffect coded with reference from:
     * Generate Array of months with moment - Reactjs. stack overflow. (2022, May 4). https://stackoverflow.com/questions/72111200/generate-array-of-months-with-moment-reactjs
     */
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


    /**
     * The following useEffect coded with reference from:
     * Filter Array of Objects based on Values from Another Array. CodeWithLinda. (2020, November 19). https://www.codewithlinda.com/blog/filter-array-of-objects/
     */
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


        const bookedTimes = myAppts
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
            await axios.post(`/clientAppointment/addAppointment`, {CID: clientSelected, Date: dateSelected, Time: timeSelected, Stylist_EID: EID, Service_SID: serviceSelected});
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
            <h1 className="mt-3">Book an Appointment for your Client</h1>

            <Form onSubmit={handleBook}>

                <Form.Group className="mb-3">
                    <Form.Label>Select client <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={clientSelected}
                        onChange={(e) => setClientSelected(e.target.value)}
                        required
                    >
                        <option value="">Select a client</option>
                        {myClients.map((client) => (
                            <option value={client.CID}>
                                {client.FName} {client.MName} {client.LName} (CID: {client.CID})
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

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