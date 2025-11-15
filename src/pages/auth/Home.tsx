import React, { useState } from 'react';
import './Home.scss';

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    if (!location) {
      alert('Please enter a location to search');
      return;
    }
    console.log('Searching...', { location, propertyType, minPrice, maxPrice, activeFilter });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Instantly Rent</h1>
        <p>Your Property, Your Story, Our Commitment.</p>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`tab ${activeFilter === 'buy' ? 'active' : ''}`}
            onClick={() => setActiveFilter('buy')}
          >
            Buy
          </button>
          <button 
            className={`tab ${activeFilter === 'rent' ? 'active' : ''}`}
            onClick={() => setActiveFilter('rent')}
          >
            Rent
          </button>
          <button 
            className={`tab ${activeFilter === 'sale' ? 'active' : ''}`}
            onClick={() => setActiveFilter('sale')}
          >
            Sale
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="📍 Location, City Name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select 
            className="search-select"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">☰ Select Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
          </select>
          <select 
            className="search-select"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          >
            <option value="">₹ Minimum Price</option>
            <option value="10000">₹ 10,000</option>
            <option value="25000">₹ 25,000</option>
            <option value="50000">₹ 50,000</option>
          </select>
          <select 
            className="search-select"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="">₹ Maximum Price</option>
            <option value="50000">₹ 50,000</option>
            <option value="100000">₹ 1,00,000</option>
            <option value="200000">₹ 2,00,000</option>
          </select>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-card">
          <div className="stat-number">1,000+</div>
          <div className="stat-text">
            Exclusive & Premium Properties Available Just for You!
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-text">
            MDP Verified Dream Homes – Safe, Secure & Trustworthy!
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-number">200+</div>
          <div className="stat-text">
            Top Properties in the Best & Prime Locations!
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-number">149+</div>
          <div className="stat-text">
            Find Your Dream Property – Perfectly Tailored for You!
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;