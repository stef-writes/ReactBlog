import React from 'react';
import BlogPostItem from '../blog-post-component/BlogPostItem';  // Child component -> renders single post
import styles from './BlogPostList.module.css';  // Scoped CSS -> prevents style conflicts

const BlogPostList = ({ posts }) => {  // Destructured props from App.jsx
  if (!posts || posts.length === 0) {  // Conditional render for empty state
    return <p className={styles.noPosts}>No blog posts available.</p>;
  }

  return (
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
  );
};

export default BlogPostList;