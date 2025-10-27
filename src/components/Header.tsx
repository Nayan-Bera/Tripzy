import React from "react";
import { Link } from "react-router-dom"; // or your router
import Logo from "../assets/react.svg"; // replace with project logo path

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container-custom flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-10 h-10 rounded-md" />
          <div>
            <h1 className="text-lg font-semibold">Tripzy</h1>
            <p className="text-xs text-gray-500">Comfort stays, great prices</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/rooms" className="text-sm hover:text-indigo-600">Rooms</Link>
          <Link to="/about" className="text-sm hover:text-indigo-600">About</Link>
          <Link to="/contact" className="text-sm hover:text-indigo-600">Contact</Link>
          <Link to="/login" className="px-4 py-2 border rounded-md text-sm hover:bg-indigo-50">Sign in</Link>
        </nav>

        <div className="md:hidden">
          {/* Hamburger - simple toggle placeholder */}
          <button aria-label="Open menu" className="p-2 rounded-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
