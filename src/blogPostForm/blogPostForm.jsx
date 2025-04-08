import React, { useState } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(post?.date || '');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!title) newErrors.title = 'Required';
    if (!content) newErrors.content = 'Required';
    if (!author) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmit({ title, content, author, date });
    }
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <div className={styles.inputWrapper}>
          <input
            id="title"
            type="text"
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className={styles.error}>{errors.title}</p>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>Content</label>
        <div className={styles.inputWrapper}>
          <textarea
            id="content"
            className={`${styles.textarea} ${errors.content ? styles.inputError : ''}`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
          />
          {errors.content && <p className={styles.error}>{errors.content}</p>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="author" className={styles.label}>Author</label>
        <div className={styles.inputWrapper}>
          <input
            id="author"
            type="text"
            className={`${styles.input} ${errors.author ? styles.inputError : ''}`}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.author && <p className={styles.error}>{errors.author}</p>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.label}>Publication Date</label>
        <div className={styles.inputWrapper}>
          <input
            id="date"
            type="date"
            className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <p className={styles.error}>{errors.date}</p>}
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;