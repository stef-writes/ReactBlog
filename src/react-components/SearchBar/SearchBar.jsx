import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  // State to manage mobile search visibility
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  // State to track if the screen is mobile size
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
      // If resizing back to desktop, ensure search is closed if it was mobile-only
      if (!mobile) {
          setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    // Optional: Trigger search dynamically as user types (debounced)
    // onSearch(event.target.value);
  };

  const handleSearch = (event) => {
    // Trigger search on Enter key press or form submission
    if (event.key === 'Enter' || event.type === 'submit') {
      event.preventDefault(); // Prevent default form submission if applicable
      onSearch(query);
      // Optionally close mobile search on submit
      // if (isMobileView) {
      //   setIsMobileSearchOpen(false);
      // }
    }
  };

  const handleSubmit = (event) => {
      event.preventDefault(); // Prevent page reload on submit
      onSearch(query);
      // Optionally close mobile search on submit
      // if (isMobileView) {
      //   setIsMobileSearchOpen(false);
      // }
  }

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  // Determine form classes based on state and view
  const formClasses = `
    ${styles.searchForm}
    ${isMobileView ? (isMobileSearchOpen ? styles.mobileOpen : styles.mobileClosed) : ''}
  `;

  return (
    // Use a div container to manage icon visibility separately from the form
    <div className={styles.searchContainer}>
        {/* Show icon only on mobile when search is closed */}
        {isMobileView && !isMobileSearchOpen && (
            <button 
                type="button" 
                onClick={toggleMobileSearch} 
                className={styles.searchIconButton}
                aria-label="Open search"
            >
                🔍 {/* Placeholder icon */}
            </button>
        )}

        {/* Form is always rendered but its contents might be hidden by CSS on mobileClosed */} 
        <form className={formClasses.trim()} onSubmit={handleSubmit} role="search">
            {/* Label is always good practice, hidden visually */} 
            <label htmlFor="search-input" className={styles.visuallyHidden}>Search posts</label>
            
            {/* Input field - hidden on mobileClosed via CSS */} 
            <input
                id="search-input"
                type="search"
                className={styles.searchInput}
                placeholder="Search posts..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleSearch} // Handle Enter key press
            />

            {/* Show standard Search button only on Desktop */} 
            {!isMobileView && (
                 <button type="submit" className={styles.searchButton}>Search</button>
            )}

            {/* Show Cancel button only on Mobile when search is open */} 
            {isMobileView && isMobileSearchOpen && (
                <button 
                    type="button" 
                    onClick={toggleMobileSearch} 
                    className={styles.cancelButton}
                >
                    Cancel
                </button>
            )}
        </form>
    </div>
  );
}

export default SearchBar; 