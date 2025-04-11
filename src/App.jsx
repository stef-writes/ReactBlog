import React, { useState } from 'react';
import './App.css';
import BlogPostList from './react-components/BlogList/BlogPostList';
import BlogPostDetail from './react-components/BlogPostDetail/BlogPostDetail';
import BlogPostForm from './react-components/blogPostForm/blogPostForm';
import Layout from './react-components/ResponsiveNavigation/Layout/Layout';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { mockBlogPosts } from './react-components/BlogPostDetail/mockPosts';

function App() {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [comments, setComments] = useState({});  // Comments stored by post ID

  const handleAddComment = (postId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), { ...comment, id: Date.now() }]
    }));
  };

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
    return <BlogPostDetail 
      {...post} 
      comments={comments[id] || []}
      onAddComment={handleAddComment}
    />;
  };

  return (
    <BrowserRouter>
      <Layout>
        <div className="container">
          <Routes>
            <Route path="/" element={<BlogPostList posts={posts} />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/new" element={<CreateEditPost />} />
            <Route path="/posts/:id/edit" element={<CreateEditPost />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;