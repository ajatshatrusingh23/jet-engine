import React from 'react';
import './CommentSection.css'; // We will create this
import authorImage from '../assets/ default-avatar.png';

function CommentSection({ comments = [] }) {
  return (
    <div className="comment-section">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="comment">
            <img src={authorImage} alt="Author" className="comment-avatar" />
            <div className="comment-body">
              <span className="comment-author">{comment.name}</span>
              <p className="comment-text">{comment.text}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default CommentSection;