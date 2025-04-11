import React, { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ onSubmit, isLoggedIn, userName }) => {
  const [name, setName] = useState(isLoggedIn ? userName : '');
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!name.trim() || !text.trim()) {
      return;
    }
    
    onSubmit({
      name,
      text,
      date: new Date().toISOString()
    });
    
    // Clear form if not logged in
    if (!isLoggedIn) {
      setName('');
    }
    setText('');
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Comments</h2>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        {!isLoggedIn && (
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        
        {isLoggedIn && (
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={userName}
              disabled
              className={styles.disabledInput}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
