# React Blog Project

A responsive blog post listing application built with React, featuring a grid layout that adapts to different screen sizes.

## Features

- Responsive grid layout (1, 2, or 3 columns based on screen size)
- Semantic HTML for better accessibility
- CSS Modules for scoped styling
- React Router for navigation
- Mock data integration

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/stef-writes/reactBlog.git
   cd reactBlog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **View the application**
   Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── blog-post-component/     # Individual blog post component
├── blog-list-component/     # Blog post list container
├── mock-data/              # Mock data for development
├── App.jsx                 # Main application component
└── main.jsx               # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React
- Vite
- React Router
- CSS Modules
