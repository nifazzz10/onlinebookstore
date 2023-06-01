import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../login/Untitled_design-removebg-preview.png";
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // check if the password and confirmPassword match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    // send a request to the server to create a new user
    const response = await fetch('https://onlinebookedufundd.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      // if successful, redirect to the login page
      window.location.href = '/login';
    } else {
      // display an error message
      setErrorMessage(data.message);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '25%' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Online book shopping" style={{ width: '200px' }} />
        </div>
        <h5 className="card-title text-left">Registration</h5>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group m-1">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group m-1">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group m-1">
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex  mt-3">
            <button type="submit" className="btn btn-primary mx-2" style={{ backgroundColor: '#EF5F67' }}>Submit</button>
            <Link to="/login" className="btn btn-primary"  style={{ backgroundColor: '#EF5F67' }}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
