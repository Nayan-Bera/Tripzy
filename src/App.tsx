import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/common/header/Nav';
import Footer from './components/common/footer/footer';
import Home from './pages/auth/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


