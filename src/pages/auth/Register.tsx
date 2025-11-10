import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss'; // Using same styles as Login

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('buyer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle registration logic here
    console.log('Registration submitted:', { ...formData, userType });
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
            <h1 className="auth-title">Register</h1>

            {/* User Type Toggle */}
            <div className="user-type-toggle">
              <button
                type="button"
                className={`type-btn ${userType === 'buyer' ? 'active' : ''}`}
                onClick={() => setUserType('buyer')}
              >
                Buyer
              </button>
              <button
                type="button"
                className={`type-btn ${userType === 'seller' ? 'active' : ''}`}
                onClick={() => setUserType('seller')}
              >
                Seller
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                  value={formData.phone}
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Register
              </button>

              <div className="register-prompt">
                Already have an account? <Link to="/login">Login now</Link>
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

export default Register;