import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./Untitled_design-removebg-preview.png"
function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send a request to the server to authenticate the user
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    // Check if the login was successful
    if (response.ok) {
      setIsAuthenticated(true);
      navigate('/profile'); // Navigate to the profile page
    } else {
      setIsAuthenticated(false);
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '25%' }}>
      <div className="text-center mb-4">
          <img src={logo} alt="Online book shopping" style={{ width: '200px' }} />
        </div>
      <h5 className="card-title ">Login</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group m-1">
            <label>Email:</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group m-1">
            <label>Password:</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary mt-3"   style={{ backgroundColor: '#EF5F67' }}>Submit</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
