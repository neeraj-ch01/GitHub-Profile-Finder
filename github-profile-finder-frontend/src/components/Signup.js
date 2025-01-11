import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/registrationService';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateInput = (user) => {
    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com|zoho\.com|rediffmail\.com|outlook\.com|yahoo\.com)$/
    
    if (!namePattern.test(user.name)) {
      return 'Name should only contain alphabetic characters';
    }

    if (!emailPattern.test(user.email)) {
      return 'Email should contain only alphanumeric characters and be one of the allowed domains';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMessage = validateInput(user);
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }
    try {
      const response = await registerUser(user);
      setMessage('Registration successful!');
      console.log('Registration successful:', response);
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
              {message && <p className="alert alert-info">{message}</p>}
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your Name' id='nameInput' type='text' name='name' value={user.name} onChange={handleChange} className='w-100' />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email' id='emailInput' type='email' name='email' value={user.email} onChange={handleChange} />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' id='passwordInput' type='password' name='password' value={user.password} onChange={handleChange} />
                </div>
                <div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>
                <MDBBtn className='mb-4' size='lg' type='submit'>Register</MDBBtn>
              </form>
            </MDBCol>
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Signup;
