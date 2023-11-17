import React from "react";
import "./pageNotFound.css"
import Alert from 'react-bootstrap/Alert';
import {useNavigate} from "react-router-dom";

const PageNotFound = () => {

    // implementing the back function via the useNavigate feature of the router.
    let navigate = useNavigate();

  return(
      <div className="Error404">
          <div className="mx-auto mt-5" style={{ maxWidth: '328px' }}>
              <Alert variant = "secondary" >
                  <Alert.Heading>Error 404: Page Not Found</Alert.Heading>
                  <p>
                      We are sorry to inform you that the url you requested could not be found. Please click{' '}
                      <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate(-1)}>
                here
              </span>{' '}
                      to go back to the previous page.
                  </p>
              </Alert>
          </div>
      </div>
  )
}

export default PageNotFound