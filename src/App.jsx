import React, { useState } from 'react';
import './App.css';
import BlogPostList from './blog-list-component/BlogPostList';
import BlogPostDetail from './blogPostDetail/BlogPostDetail';
import BlogPostForm from './blogPostForm/blogPostForm';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { mockBlogPosts } from './blogPostDetail/mockPosts';

function App() {
  const [posts, setPosts] = useState(mockBlogPosts);

  // Component to handle blog post creation/editing
  const CreateEditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const post = id ? posts.find(p => p.id === id) : null;
    
    const handleSubmit = (formData) => {
      return new Promise((resolve) => {
        if (id) {
          // Update existing post
          setPosts(posts.map(p => p.id === id ? { ...p, ...formData } : p));
        } else {
          // Create new post
          const newPost = {
            id: String(posts.length + 1),
            ...formData
          };
          setPosts([...posts, newPost]);
        }
        
        setTimeout(() => {
          navigate('/');
          resolve();
        }, 500);
      });
    };
    
    return <BlogPostForm post={post} onSubmit={handleSubmit} />;
  };

  // Component to display blog post details
  const PostDetail = () => {
    const { id } = useParams();
    const post = posts.find(p => p.id === id);
    
    if (!post) return <p>Post not found</p>;
    return <BlogPostDetail {...post} />;
  };

  return (
    <BrowserRouter>
      <div className="container">
        <h1 className="title">Blog Posts</h1>
        <Routes>
          <Route path="/" element={<BlogPostList posts={posts} />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreateEditPost />} />
          <Route path="/posts/:id/edit" element={<CreateEditPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;