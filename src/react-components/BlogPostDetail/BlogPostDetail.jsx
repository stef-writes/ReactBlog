import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ title, content, author, date }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!title || !content || !author || !date) {
    return <p>Blog post not found.</p>;
  }

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  return (
    <div className={styles.blogPostDetail}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <button 
          onClick={handleEdit} 
          className={styles.editButton}
          aria-label="Edit this post"
        >
          Edit Post
        </button>
      </div>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogPostDetail; 