export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const API_ENDPOINTS = {
  questions: '/api.php',
  token: '/api_token.php',
} as const;

export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'] as const;

export const RESPONSE_CODES = {
  SUCCESS: 0,
  NO_RESULTS: 1,
  INVALID_PARAMETER: 2,
  TOKEN_NOT_FOUND: 3,
  TOKEN_EMPTY: 4,
} as const;

export const QUESTIONS_PER_LOAD = 50;

export const CHART_COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#14b8a6', // Teal
  '#6366f1', // Indigo
  '#f97316', // Orange
  '#dc2626', // Dark Red
  '#7c3aed', // Violet
  '#059669', // Emerald
  '#0ea5e9', // Sky Blue
  '#a855f7', // Fuchsia
  '#f43f5e', // Rose
  '#eab308', // Yellow
  '#22c55e', // Bright Green
  '#64748b', // Slate
  '#fbbf24', // Golden Yellow
  '#8b5a2b', // Brown
  '#be123c', // Crimson
  '#1e40af', // Dark Blue
  '#7c2d12', // Dark Brown
  '#581c87', // Dark Purple
  '#166534', // Dark Green
  '#b91c1c', // Deep Red
  '#1e293b', // Dark Slate
  '#0891b2', // Ocean Blue
  '#65a30d', // Olive Green
  '#c2410c', // Rust Orange
  '#7e22ce', // Deep Purple
  '#be185d', // Magenta
  '#0f766e', // Dark Teal
  '#4338ca', // Deep Indigo
  '#b45309', // Burnt Orange
  '#991b1b', // Maroon
] as const;

export const CATEGORIES = 'categories';
export const DIFFICULTY_DATA = 'difficulty data';
export const REQUEST = 'request';
export const RESET = 'reset';
export const MULTIPLE = 'multiple';
