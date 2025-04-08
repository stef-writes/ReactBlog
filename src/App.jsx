import React from 'react';
import './App.css';
import BlogPostList from './blog-list-component/BlogPostList';  // Container component -> renders list of BlogPostItems
import BlogPostDetail from './blogPostDetail/BlogPostDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Enables client-side routing
import { mockBlogPosts } from './blogPostDetail/mockPosts';  // Updated import path

function App() {
  return (
    <BrowserRouter>
      <div className="container">  {/* Global styles & layout container */}
        <h1 className="title">Blog Posts</h1>
        <Routes>
          <Route path="/" element={<BlogPostList posts={mockBlogPosts} />} />
          <Route 
            path="/post/:id" 
            element={
              <BlogPostDetail 
                title={mockBlogPosts[0].title}
                content={mockBlogPosts[0].content}
                author={mockBlogPosts[0].author}
                date={mockBlogPosts[0].date}
              />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;