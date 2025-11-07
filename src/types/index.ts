export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface CategoryStats {
  category: string;
  count: number;
}

export interface DifficultyStats {
  difficulty: 'easy' | 'medium' | 'hard';
  count: number;
}

export interface DropdownOption<T = string> {
  value: T;
  label: string;
}

// API Response Types
export interface TokenResponse {
  response_code: number;
  response_message: string;
  token: string;
}

export interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}