 import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.js';
import './Form.css';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userInfo } = useContext(AuthContext); // Get userInfo to access the auth token
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // We must include the user's token in the request headers
      // to access a protected route.
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`, // This is the crucial part
        },
      };

      // Make the POST request to our new endpoint
      const { data } = await axios.post(
        'http://localhost:5001/api/posts',
        { title, content },
        config
      );

      console.log('Post created successfully:', data);
      setLoading(false);
      navigate('/'); // Redirect to the homepage to see the new post

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={submitHandler}>
        <h1>Create a New Post</h1>

        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows="10"
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;