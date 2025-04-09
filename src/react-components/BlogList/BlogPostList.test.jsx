import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import BlogPostList from './BlogPostList';

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('BlogPostList', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('renders empty state message when no posts', () => {
    renderWithRouter(<BlogPostList posts={[]} />);
    expect(screen.getByRole('paragraph')).toHaveTextContent('No blog posts available.');
  });

  it('renders multiple blog posts correctly', () => {
    const mockPosts = [
      {
        id: '1',
        title: 'First Post',
        summary: 'First summary',
        date: '2023-01-01',
        url: '/posts/1'
      },
      {
        id: '2',
        title: 'Second Post',
        summary: 'Second summary',
        date: '2023-01-02',
        url: '/posts/2'
      }
    ];
    
    renderWithRouter(<BlogPostList posts={mockPosts} />);
    
    // Check for articles using role
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);
    
    // Check for headings using role
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('First Post');
    expect(headings[1]).toHaveTextContent('Second Post');
    
    // Check for links using role
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/posts/1');
    expect(links[1]).toHaveAttribute('href', '/posts/2');
  });

  it('handles null posts prop gracefully', () => {
    renderWithRouter(<BlogPostList posts={null} />);
    expect(screen.getByRole('paragraph')).toHaveTextContent('No blog posts available.');
  });

});
