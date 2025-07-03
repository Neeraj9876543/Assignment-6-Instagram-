// frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../components/SweetComponent';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem('authUser', JSON.stringify(matchedUser));
      showSuccess('Login successful!');
      setTimeout(() => navigate('/'), 1000); // 👈 Navigate to home
    } else {
      showError('Login failed', 'Invalid username or password');
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

          <button type="submit" className="btn btn-primary w-100">Log In</button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account?{' '}
            <a href="/signup" className="text-decoration-none text-primary fw-bold">Sign up</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
