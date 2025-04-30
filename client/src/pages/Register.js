import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
     const res= await API.post('/user/register', { name, email, password });
     console.log('Login response:', res.data)
      localStorage.setItem('token', res.data.data.token);
  
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Registration failed');
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <div className="auth-links">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      </div>
      
      <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
