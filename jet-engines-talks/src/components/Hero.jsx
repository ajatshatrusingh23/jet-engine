 import React, { useContext } from 'react'; // 1. Import useContext
import { AuthContext } from '../context/AuthContext.js'; // 2. Import AuthContext
import './Hero.css';
import heroImage from '../assets/ hero-image.jpg';

function Hero() {
  const { userInfo } = useContext(AuthContext); // 3. Get userInfo from context

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Jet Engines Talks</h1>
        <p>
          A community-driven platform where users can post, comment, and share
          knowledge about jet engine technologies.
        </p>
        <div className="hero-buttons"> {/* Add a wrapper for buttons */}
          <a href="#posts"> {/* Link to the posts section on the page */}
            <button className="get-started-button">Get Started</button>
          </a>
          {/* 4. Conditionally render the Create Post button */}
          {userInfo && (
            <a href="/create-post">
              <button className="create-post-button"> Post</button>
            </a>
          )}
        </div>
      </div>
      <div className="hero-image-container">
        <img src={heroImage} alt="Jet Engine Fan" />
      </div>
    </div>
  );
}

export default Hero;