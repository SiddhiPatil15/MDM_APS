import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Search, PlusCircle, User, PackageOpen } from 'lucide-react';
import './Navbar.css';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAppContext();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <Leaf className="logo-icon" size={28} />
          <span className="logo-text">APS</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/browse" className={`nav-link ${location.pathname === '/browse' ? 'active' : ''}`}>
            <Search size={18} />
            <span>Browse</span>
          </Link>
          {currentUser ? (
            <>
              <Link to="/add-item" className={`nav-link ${location.pathname === '/add-item' ? 'active' : ''}`}>
                <PlusCircle size={18} />
                <span>Share Item</span>
              </Link>
              <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                <User size={18} />
                <span>Dashboard</span>
              </Link>
              <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={logout}>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/auth" className={`nav-link ${location.pathname === '/auth' ? 'active' : ''}`}>
              <User size={18} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
