# Trivia Statistics Dashboard

A React app that fetches trivia questions and displays statistics by category and difficulty. Built with TypeScript and Vite.

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
