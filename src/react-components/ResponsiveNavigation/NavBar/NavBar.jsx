import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import SearchBar from '../../SearchBar/SearchBar';

const NavBar = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo}>Blog Application</Link>
      <div className={styles.navContent}>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
        </div>
        <SearchBar onSearch={onSearch} />
      </div>
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/blog" onClick={toggleMobileMenu}>Blog</Link>
          <Link to="/about" onClick={toggleMobileMenu}>About</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
