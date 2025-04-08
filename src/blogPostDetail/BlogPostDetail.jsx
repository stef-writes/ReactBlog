import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ title, content, author, date }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Handle links to open in new tab
  useEffect(() => {
    const contentElement = document.querySelector(`.${styles.content}`);
    if (contentElement) {
      const links = contentElement.querySelectorAll('a');
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }, [content]);

  if (!title || !content || !author || !date) {
    return <p className={styles.notFound}>Blog post not found.</p>;
  }

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
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