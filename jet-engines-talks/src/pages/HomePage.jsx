 import React from 'react';
import Hero from '../components/Hero';
import PostsFeed from '../components/PostsFeed';
import Trending from '../components/Trending';
import '../App.css';

function HomePage() {
  return (
    // The <Navbar> has been removed from here
    <>
      <Hero />
      <main className="main-content">
        <div className="posts-column">
          <PostsFeed />
        </div>
        <div className="trending-column">
          <Trending />
        </div>
      </main>
    </>
  );
}

export default HomePage;