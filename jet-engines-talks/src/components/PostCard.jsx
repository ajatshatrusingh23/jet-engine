 import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import CommentSection from './CommentSection'; // Import the new component
import './PostCard.css';
import authorImage from '../assets/ default-avatar.png';

// Note: 'onLike' and 'onCommentSubmit' will be passed down from PostsFeed
function PostCard({ post, onLike, onCommentSubmit }) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [commentText, setCommentText] = useState('');

  const { userInfo } = useContext(AuthContext);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return; // Don't submit empty comments
    onCommentSubmit(post._id, commentText);
    setCommentText(''); // Clear the textarea after submitting
  };

  return (
    <div className="post-card">
      <div className="post-author">
        <img src={authorImage} alt="Author" className="author-avatar" />
        <div className="author-info">
          <span className="author-name">{post.authorName}</span>
          <span className="post-time">{post.time}</span>
        </div>
      </div>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <div className="post-stats">
        <button className="like-button" onClick={() => onLike(post._id)}>
          👍 {post.likes?.length || 0}
        </button>
        {/* Toggle visibility of the comment section */}
        <button className="comment-toggle" onClick={() => setCommentsVisible(!commentsVisible)}>
          💬 {post.comments?.length || 0} Comments
        </button>
      </div>

      {/* Conditionally render the comment section and form */}
      {commentsVisible && (
        <>
          <CommentSection comments={post.comments} />
          {userInfo && ( // Only show the form if the user is logged in
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              ></textarea>
              <button type="submit">Post Comment</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default PostCard;