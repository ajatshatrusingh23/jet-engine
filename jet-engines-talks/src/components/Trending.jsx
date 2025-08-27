import React from 'react';
import './Trending.css'; // We will create this file next

function Trending() {
  return (
    <div className="trending-card">
      <h3 className="trending-title">Trending</h3>
      <ul className="trending-list">
        <li><a href="#">Hybrid Electric Propulsion</a></li>
        <li><a href="#">Noise Reduction Techniques</a></li>
        {/* We can add more topics here later */}
      </ul>
    </div>
  );
}

export default Trending;