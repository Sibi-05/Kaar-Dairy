import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import LoginModal from './AuthModal/LoginModal';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const navigate=useNavigate();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 400) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/")
  };

  return (
    <div className='navbar'>
      <div className='logo'>Kaar Dairy</div>

      <div className='navs'>
        <div>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </div>

        <div>
          <NavLink to="/shop" className={({ isActive }) => isActive ? "active" : ""}>
            Shop
          </NavLink>
        </div>

        <div>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            About
          </NavLink>
        </div>

        {user && <div>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>
            Cart
          </NavLink>
        </div>}

        {user && <div><NavLink to="/orders" className={({ isActive }) => isActive ? "active" : ""}>Orders</NavLink></div>}

       
        {user ? (
          <div className="user-section">
            <span className='profile'>{user.name[0]}</span> 
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth" onClick={() => setShowModal(true)}>
            <div className='login'>Login</div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className='menu' onClick={() => setOpen(!open)}>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>

      <div className={`navigation-overlay ${open ? 'active' : ''}`}>
  {/* Top Right Close Button */}
  <button className="close-menu-btn" onClick={() => setOpen(false)}>
    <span>CLOSE</span>
    <div className="close-icon">&times;</div>
  </button>

  <nav className="nav-container">
    {/* Main Links */}
    <div className="nav-links">
      <Link to="/" onClick={() => setOpen(false)}>Home</Link>
      <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
      <Link to="/about" onClick={() => setOpen(false)}>About</Link>
      {user && <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>}
      {user && <Link to="/orders" onClick={() => setOpen(false)}>Orders</Link>}
    </div>

    <div className="nav-auth-section">
      {user ? (
        <div className="user-profile">
          <span className="welcome-text">Welcome, {user.name}</span>
          <button className="auth-btn logout" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button className="auth-btn login" onClick={() => { setShowModal(true); setOpen(false); }}>
          Login / Register
        </button>
      )}
    </div>
  </nav>
</div>

      {/* ✅ Modal with callback */}
      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogin={(userData) => setUser(userData)} // 🔥 IMPORTANT
      />
    </div>
  );
};

export default Navbar;