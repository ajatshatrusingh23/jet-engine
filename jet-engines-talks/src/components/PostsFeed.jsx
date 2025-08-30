 import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import PostCard from './PostCard';
import './PostsFeed.css';
import api from '../api'; // 👈 import our api instance

function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo, refreshNeeded } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/posts'); // 👈 changed
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError('Could not load posts.');
          setPosts([]);
        }
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [refreshNeeded]);

  const likeHandler = async (postId) => {
    if (!userInfo || !userInfo.token) {
      return alert('You must be logged in to like posts.');
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.put(`/posts/${postId}/like`, {}, config); // 👈 changed
      setPosts(posts.map(p => (p._id === postId ? data : p)));
    } catch (err) {
      console.error('Failed to like post:', err.response?.data?.message || err.message);
      alert('Error: Could not like post.');
    }
  };

  const commentSubmitHandler = async (postId, text) => {
    if (!userInfo) {
      return alert('Please log in to comment.');
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.post(`/posts/${postId}/comments`, { text }, config); // 👈 changed
      setPosts(posts.map(p => (p._id === postId ? data : p)));
    } catch (err) {
      console.error('Failed to add comment:', err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return <div className="feed-status">Loading posts...</div>;
  }
  if (error) {
    return <div className="feed-status error">{error}</div>;
  }

  return (
    <div className="posts-feed" id="posts">
      <h2 className="feed-title">Posts</h2>
      {posts.length === 0 ? <p>No posts to display.</p> : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={likeHandler}
            onCommentSubmit={commentSubmitHandler}
          />
        ))
      )}
    </div>
  );
}

export default PostsFeed;
