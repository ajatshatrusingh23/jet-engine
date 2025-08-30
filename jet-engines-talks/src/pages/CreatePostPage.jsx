 import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import './Form.css';
import api from '../api'; // 👈 import api instance

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // 👇 use api.js instead of hardcoding localhost
      const { data } = await api.post('/posts', { title, content }, config);

      console.log('Post created successfully:', data);
      setLoading(false);
      navigate('/');

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
