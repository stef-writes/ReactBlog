import React from 'react';
import './App.css';
import BlogPostList from './blog-list-component/BlogPostList';  // Container component -> renders list of BlogPostItems
import { BrowserRouter } from 'react-router-dom';  // Enables client-side routing
import { mockBlogPosts } from './mock-data/mockPosts';  // Simulated API data

function App() {
  return (
    <BrowserRouter>
      <div className="container">  {/* Global styles & layout container */}
        <h1 className="title">Blog Posts</h1>
        <BlogPostList posts={mockBlogPosts} />  {/* Parent->child data flow via props */}
      </div>
    </BrowserRouter>
  );
}

export default App;