import React, { useState } from 'react';
import API from '../api';
import { useNavigate , Link} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/user/login', { email, password });
      console.log('Login response:', res.data)
      localStorage.setItem('token', res.data.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="auth-links">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      </div>
    

      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
