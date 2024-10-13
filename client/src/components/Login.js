import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        login(data)
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
  <div className="admin-login">
    {/* Right side for the image */}
    <div
      className="login-image"
      style={{ backgroundImage: "url(https://i0.wp.com/www.australiangeographic.com.au/wp-content/uploads/2017/09/Trimeresurus-insularis-shutterstock-scaled.jpg?fit=2560%2C1707&ssl=1)" }} // Replace with your image URL
    ></div>
    {/* Left side for the login form */}
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</div>
  );
};

export default Login;