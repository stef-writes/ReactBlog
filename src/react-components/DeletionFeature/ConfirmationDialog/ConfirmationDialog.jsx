import React from 'react';
import styles from './ConfirmationDialog.module.css';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this post?</p>
        <div className={styles.buttons}>
          <button onClick={onClose}>No! No! No!</button>
          <button onClick={onConfirm}>Double Down, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog; 