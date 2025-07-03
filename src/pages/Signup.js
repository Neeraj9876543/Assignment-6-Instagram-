import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../components/SweetComponent';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find((user) => user.username === form.username);

    if (exists) {
      showError('Signup Failed', 'Username already exists');
      return;
    }

    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    showSuccess('Signup successful!');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '350px' }}>
        <div className="text-center mb-4">
          <h3>Instagram</h3>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{' '}
            <a href="/login" className="text-decoration-none text-primary fw-bold">Log in</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Signup;
