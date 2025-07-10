import React, { useState } from 'react';
import { showSuccess, showError } from '../components/SweetComponent';
import API from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    re_password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('auth/users/', formData);
      showSuccess('Signup successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.username?.[0] ||
        err?.response?.data?.email?.[0] ||
        err?.response?.data?.non_field_errors?.[0] ||
        'Signup failed';
      showError('Signup failed', msg);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '350px' }}>
        <h3 className="text-center mb-3">Create Account</h3>
        <form onSubmit={handleSignup}>
          <input
            name="username"
            placeholder="Username"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />
          <input
            name="re_password"
            type="password"
            placeholder="Confirm Password"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <small>
            Already have an account?{' '}
            <a href="/" className="text-decoration-none fw-bold text-primary">
              Log in
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Signup;
