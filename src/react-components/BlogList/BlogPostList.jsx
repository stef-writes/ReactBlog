import React from 'react';
import { Link } from 'react-router-dom';
import BlogPostItem from '../blogPost/BlogPostItem';  // Child component -> renders single post
import styles from './BlogPostList.module.css';  // Scoped CSS -> prevents style conflicts

const BlogPostList = ({ posts }) => {  // Destructured props from App.jsx
  if (!posts || posts.length === 0) {  // Conditional render for empty state
    return <p className={styles.noPosts}>No blog posts available.</p>;
  }

  return (
    <div>
      <div className={styles.header}>
        <Link to="/create" className={styles.createButton}>Create New Post</Link>
      </div>
      <div className={styles.blogPostList}>  {/* Grid container -> responsive layout */}
        {posts.map((post) => (  // Transform data -> BlogPostItem components
          <BlogPostItem
            key={post.id}  // React key -> optimizes list updates
            id={post.id}
            title={post.title}
            summary={post.summary}
            date={post.date}
            url={post.url}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPostList;