 import React, { useContext } from 'react'; // Import useContext
 import { AuthContext } from '../context/AuthContext.js'; // Import our context
import { useNavigate } from 'react-router-dom'; // To redirect on logout
import './Navbar.css';

function Navbar() {
  // Get auth state and functions from the global context
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout(); // Clear user state and remove from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <p>JET ENGINE TALKS</p>
        </a>
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="navbar-action">
        {userInfo ? (
          // If user is logged in, show their name and a logout button
          <div className="user-menu">
            <span className="user-name">{userInfo.name}</span>
            <button onClick={logoutHandler} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          // If user is logged out, show the Sign In button
          <a href="/login">
            <button className="sign-in-button">Sign In</button>
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;