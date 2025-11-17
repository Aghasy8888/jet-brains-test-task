# Trivia Statistics Dashboard

A React app that fetches trivia questions and displays statistics by category and difficulty. Built with TypeScript and Vite.

## Lighthouse Test Results

- **Performance**: 94
- **Accessibility**: 96
- **Best Practices**: 96
- **SEO**: 100

## Features

- **Interactive Statistics Dashboard** - Visualize trivia questions by category and difficulty with interactive charts
- **Category Filtering** - Filter questions by category to focus on specific topics
- **Data Visualization** - Pie charts for category distribution and difficulty breakdown
- **Load More Questions** - Dynamically load additional questions with pagination support
- **Duplicate Prevention** - Professional API handling with session token management to prevent duplicate questions across requests
- **Dark Mode Support** - Full dark mode implementation with smooth transitions
- **Responsive Design** - Optimized for all screen sizes from mobile to desktop
- **Performance Optimized** - Lazy loading of chart components and efficient data processing
- **Toast Notifications** - User-friendly notifications for successful operations and errors
- **Error Handling** - Comprehensive error handling with automatic retry logic and token management

## Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - Custom theming for dark mode

### Data Visualization
- **Recharts** - Chart library for React

### API & HTTP
- **Axios** - HTTP client with retry logic

### UI/UX
- **React Toastify** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript ESLint** - TypeScript-specific linting rules

### Build & Performance
- **React Compiler** - Optimized React rendering
- **Code Splitting** - Lazy loading for optimal bundle size

## Getting Started

### Prerequisites

You'll need Node.js installed on your machine.

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Environment Variables

If you need to use a different API base URL, create a `.env` file in the root directory:

```
VITE_API_BASE_URL=your_api_url_here
```

### Build

To create a production build:

```bash
npm run build
```

### Pre-commit Hooks

This project uses Husky to run pre-commit hooks. When you commit code, it automatically:
- Formats and lints your staged files using Prettier and ESLint
- Runs TypeScript type checking

The hooks are set up automatically when you run `npm install`, so you don't need to do anything extra.
