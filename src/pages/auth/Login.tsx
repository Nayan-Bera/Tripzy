import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', formData);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            {/* Logo */}
            <div className="auth-logo">
              <div className="logo-icon"></div>
              <div className="logo-text">
                <span className="logo-title">MyDearProperty</span>
                <span className="logo-subtitle">Convert Dreams into Reality</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="auth-title">Login</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Login
              </button>

              <div className="form-links">
                <span className="forgot-link">Forgot password?</span>
                <Link to="/reset-password" className="reset-link">Reset now</Link>
              </div>

              <div className="register-prompt">
                Don't have an account? <Link to="/register">Register now</Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="auth-info-section">
          <div className="info-content">
            <h2>Sell or Rent your Property For Free</h2>
            <h3>30 Lac+ Home Owners Trust Us</h3>
            <p>
              I posted a property ad on MyDearProperty, an efficient real estate platform. 
              Despite my busy schedule, they ensured timely communication, keeping me updated 
              through emails and messages. They successfully found a tenant for my rental 
              property that perfectly matched my requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;