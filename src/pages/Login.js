import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../components/SweetComponent';
import API from '../api/axiosInstance';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 🔁 Load token from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 🔐 Authenticate user
      const res = await API.post('auth/token/login/', {
        username,
        password,
      });

      const token = res.data.auth_token;
      localStorage.setItem('token', token);
      API.defaults.headers.common['Authorization'] = `Token ${token}`;

      // 👤 Get user details
      const user = await API.get('auth/users/me/');
      localStorage.setItem('authUser', JSON.stringify(user.data));

      showSuccess('Login successful!');
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      console.error('Login error:', err);
      const msg =
        err?.response?.data?.non_field_errors?.[0] ||
        err?.response?.data?.detail ||
        'Login failed';
      showError('Login failed', msg);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '350px' }}>
        <div className="text-center mb-4">
          <h3>Instagram</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            Don’t have an account?{' '}
            <a href="/signup" className="text-decoration-none text-primary fw-bold">
              Sign up
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
