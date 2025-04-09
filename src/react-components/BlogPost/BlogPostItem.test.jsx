import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import BlogPostItem from './BlogPostItem';

const mockPost = {
  id: '1',
  title: 'Test Title',
  summary: 'Test Summary',
  date: '2023-01-01',
  url: '/posts/1'
};

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('BlogPostItem', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('renders post content with correct semantic structure', () => {
    renderWithRouter(<BlogPostItem {...mockPost} />);
    
    // Check article container
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    
    // Check heading
    const heading = screen.getByRole('heading', { name: mockPost.title });
    expect(heading).toBeInTheDocument();
    
    // Check link
    const link = screen.getByRole('link', { name: /Read full article: Test Title/i });
    expect(link).toHaveAttribute('href', mockPost.url);
  });

  it('displays post summary correctly', () => {
    renderWithRouter(<BlogPostItem {...mockPost} />);
    const article = screen.getByRole('article');
    expect(article).toHaveTextContent(mockPost.summary);
  });

  it('formats and displays the date with correct attributes', () => {
    renderWithRouter(<BlogPostItem {...mockPost} />);
    const time = screen.getByRole('time');
    expect(time).toHaveAttribute('datetime', mockPost.date);
    expect(time).toHaveTextContent(/Published on/);
  });

  it('has correct accessibility attributes', () => {
    renderWithRouter(<BlogPostItem {...mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', `Read full article: ${mockPost.title}`);
  });

});
