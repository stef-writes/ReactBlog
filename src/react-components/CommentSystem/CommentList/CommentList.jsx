import React from 'react';
import Comment from '../CommentComponent/Comment';
import styles from './CommentList.module.css';

const CommentList = ({ comments }) => {
  // Sort comments chronologically, newest at bottom
  const sortedComments = [...comments].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return (
    <div 
      className={styles.commentList}
      aria-live="polite"
    >
      {sortedComments.map((comment) => (
        <Comment
          key={comment.id}
          name={comment.name}
          date={comment.date}
          text={comment.text}
          avatar={comment.avatar}
        />
      ))}
    </div>
  );
};

export default CommentList;
