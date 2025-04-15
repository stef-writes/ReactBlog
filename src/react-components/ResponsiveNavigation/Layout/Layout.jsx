import React from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Layout.module.css';

const Layout = ({ children, onSearch }) => {
  return (
    <div className={styles.layout}>
      <header>
        <NavBar onSearch={onSearch} />
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2023 BlogApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
