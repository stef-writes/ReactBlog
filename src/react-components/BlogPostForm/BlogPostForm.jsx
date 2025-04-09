import React, { useState } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content ? post.content.replace(/<[^>]*>/g, '') : '');
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
      // Format content with paragraphs
      const formattedContent = content
        .split('\n\n')
        .map(paragraph => paragraph.trim())
        .filter(paragraph => paragraph.length > 0)
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('\n');

      onSubmit({ 
        title, 
        content: formattedContent, 
        author, 
        date 
      });
    }
  };

  const handleFormat = (type) => {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = '';

    switch (type) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'bullet':
        formattedText = `\n• ${selectedText}`;
        break;
      case 'number':
        formattedText = `\n1. ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
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
          <div className={styles.formatToolbar}>
            <button type="button" onClick={() => handleFormat('bold')} className={styles.formatButton}>B</button>
            <button type="button" onClick={() => handleFormat('italic')} className={styles.formatButton}>I</button>
            <button type="button" onClick={() => handleFormat('bullet')} className={styles.formatButton}>•</button>
            <button type="button" onClick={() => handleFormat('number')} className={styles.formatButton}>#</button>
          </div>
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