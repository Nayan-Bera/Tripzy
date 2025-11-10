import React from 'react';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Instantly Rent</h1>
          <p className="hero-subtitle">Your Property, Your Story, Our Commitment.</p>
          
          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button className="tab-btn active">All</button>
            <button className="tab-btn">Buy</button>
            <button className="tab-btn">Rent</button>
            <button className="tab-btn">Sale</button>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-field">
              <span className="search-icon">📍</span>
              <input 
                type="text" 
                placeholder="Location, City Name" 
                className="search-input"
              />
            </div>

            <div className="search-field">
              <span className="search-icon">☰</span>
              <select className="search-select">
                <option>Select Property Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
                <option>Office</option>
              </select>
            </div>

            <div className="search-field">
              <span className="search-icon">₹</span>
              <select className="search-select">
                <option>Minimum Price</option>
                <option>10,000</option>
                <option>25,000</option>
                <option>50,000</option>
                <option>1,00,000</option>
              </select>
            </div>

            <div className="search-field">
              <span className="search-icon">₹</span>
              <select className="search-select">
                <option>Maximum Price</option>
                <option>50,000</option>
                <option>1,00,000</option>
                <option>2,50,000</option>
                <option>5,00,000</option>
              </select>
            </div>

            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <h2 className="stat-number">1,000+</h2>
          <p className="stat-description">
            Exclusive & Premium Properties Available Just for You!
          </p>
        </div>

        <div className="stat-card">
          <h2 className="stat-number">100%</h2>
          <p className="stat-description">
            MDP Verified Dream Homes – Safe, Secure & Trustworthy!
          </p>
        </div>

        <div className="stat-card">
          <h2 className="stat-number">200+</h2>
          <p className="stat-description">
            Top Properties in the Best & Prime Locations!
          </p>
        </div>

        <div className="stat-card">
          <h2 className="stat-number">149+</h2>
          <p className="stat-description">
            Find Your Dream Property – Perfectly Tailored for You!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;