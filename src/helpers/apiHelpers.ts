import axios from 'axios';
import type {
  TriviaResponse,
  TriviaCategoriesResponse,
} from '../types';
import { API_BASE_URL, API_ENDPOINTS } from '../constants';

const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = INITIAL_DELAY
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      
      if ((status === 429 || (status && status >= 500)) && retries > 0) {
        await sleep(delay);
        return fetchWithRetry(fetchFn, retries - 1, delay * 2);
      }
    }
    throw error;
  }
}

export async function fetchCategories(): Promise<TriviaCategoriesResponse> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.categories}`;
  return fetchWithRetry(async () => {
    const response = await axios.get<TriviaCategoriesResponse>(url);
    return response.data;
  });
}

export async function fetchQuestions(
  categoryId?: number,
  amount: number = 50
): Promise<TriviaResponse> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.questions}`;
  const params: Record<string, string | number> = {
    amount,
    type: 'multiple',
  };

  if (categoryId) {
    params.category = categoryId;
  }

  return fetchWithRetry(async () => {
    const response = await axios.get<TriviaResponse>(url, { params });
    return response.data;
  });
}

