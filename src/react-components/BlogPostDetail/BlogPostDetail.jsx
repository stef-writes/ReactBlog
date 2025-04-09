import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';
import DeleteButton from '../DeletionFeature/DeleteButton/DeleteButton';
import ConfirmationDialog from '../DeletionFeature/ConfirmationDialog/ConfirmationDialog';

const BlogPostDetail = ({ title, content, author, date }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    // Deletion logic would go here
    setIsDialogOpen(false);
  };

  return (
    <div className={styles.blogPostDetail}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <button 
          onClick={handleEdit} 
          className={styles.editButton}
        >
          Edit Post
        </button>
        <DeleteButton onClick={handleDeleteClick} />
      </div>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
      
      <ConfirmationDialog 
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BlogPostDetail; 