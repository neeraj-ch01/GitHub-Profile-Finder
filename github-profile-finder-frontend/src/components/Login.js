import './Login.css';

import React, { useState } from 'react';
import { authenticateUser } from '../services/authenticationService';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; 

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const validateInput = (credentials) => {
  const emailPattern = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com|zoho\.com|rediffmail\.com|outlook\.com|yahoo\.com)$/
    if (!emailPattern.test(credentials.email)) {
      return 'Email should contain only alphanumeric characters and be one of the allowed domains';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMessage = validateInput(credentials);
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }
    try {
      const response = await authenticateUser(credentials);
      console.log('Authentication successful:', response);
      setMessage('Login successful');
      // Redirect to another page if needed
    } catch (error) {
      setMessage('Login failed. Please check your credentials and try again.');
      console.error('Error during authentication:', error);
    }
  };

  return (
    <>
      <Navbar />
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </MDBCol>
          <MDBCol col='4' md='6'>
            {message && <p className="alert alert-info">{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <MDBBtn floating size='md' tag='a' className='me-2'>
                  <MDBIcon fab icon='facebook-f' />
                </MDBBtn>
                <MDBBtn floating size='md' tag='a' className='me-2'>
                  <MDBIcon fab icon='twitter' />
                </MDBBtn>
                <MDBBtn floating size='md' tag='a' className='me-2'>
                  <MDBIcon fab icon='linkedin-in' />
                </MDBBtn>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>
              <MDBInput wrapperClass='mb-4' label='Email address' id='emailInput' type='email' name='email' value={credentials.email} onChange={handleChange} size="lg" />
              <MDBInput wrapperClass='mb-4' label='Password' id='passwordInput' type='password' name='password' value={credentials.password} onChange={handleChange} size="lg" />
              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>
              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='lg' type='submit'>Login</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/signup" className="link-danger">Register</Link></p>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Login;
