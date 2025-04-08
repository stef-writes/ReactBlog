import React, { useState } from 'react';
import './App.css';
import BlogPostList from './blog-list-component/BlogPostList';  // Container component -> renders list of BlogPostItems
import BlogPostDetail from './blogPostDetail/BlogPostDetail';
import BlogPostForm from './blogPostForm/blogPostForm';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';  // Enables client-side routing
import { mockBlogPosts } from './blogPostDetail/mockPosts';  // Updated import path

// Parent component that provides post data and handles form submission
const BlogPostFormPage = ({ isEditMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState(mockBlogPosts);
  
  // Find the post to edit if in edit mode
  const postToEdit = isEditMode ? posts.find(post => post.id === parseInt(id)) : null;
  
  // Handle form submission
  const handleSubmit = (formData) => {
    return new Promise((resolve) => {
      if (isEditMode) {
        // Update existing post
        setPosts(posts.map(post => 
          post.id === parseInt(id) ? { ...post, ...formData } : post
        ));
      } else {
        // Create new post
        const newPost = {
          id: posts.length + 1,
          ...formData
        };
        setPosts([...posts, newPost]);
      }
      
      // Simulate a network delay
      setTimeout(() => {
        // Navigate back to the list view
        navigate('/');
        resolve();
      }, 500);
    });
  };
  
  return (
    <BlogPostForm 
      post={postToEdit} 
      onSubmit={handleSubmit} 
    />
  );
};

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
          <Route path="/create" element={<BlogPostFormPage isEditMode={false} />} />
          <Route path="/edit/:id" element={<BlogPostFormPage isEditMode={true} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;