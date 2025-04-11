import React from 'react';
import styles from './Comment.module.css';

const Comment = ({ name, date, text, avatar }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        {avatar && (
          <img 
            src={avatar} 
            alt={`${name}'s avatar`} 
            className={styles.avatar}
          />
        )}
        <div className={styles.commentInfo}>
          <div className={styles.name}>{name}</div>
          <div className={styles.date}>{formatDate(date)}</div>
        </div>
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Comment;
