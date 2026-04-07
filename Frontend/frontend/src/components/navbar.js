import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for icons (install: npm install lucide-react)

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            MyApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
              Dashboard
            </Link>
            <Link to="/login" className="hover:text-blue-200 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="hover:text-blue-200 transition-colors">
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700/90 backdrop-blur-lg text-white px-4 pb-4 space-y-3">
          <Link
            to="/"
            className="block hover:text-blue-200 transition-colors"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block hover:text-blue-200 transition-colors"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="block hover:text-blue-200 transition-colors"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block hover:text-blue-200 transition-colors"
            onClick={toggleMenu}
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
