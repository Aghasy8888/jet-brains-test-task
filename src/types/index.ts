export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface TriviaCategoriesResponse {
  trivia_categories: TriviaCategory[];
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

