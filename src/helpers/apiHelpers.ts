import axios from 'axios';
import type {
  TokenResponse,
  TriviaResponse,
} from '../types';
import { API_BASE_URL, API_ENDPOINTS, MULTIPLE, REQUEST, RESET } from '../constants';

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

async function requestSessionToken(): Promise<string> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.token}`;
  return fetchWithRetry(async () => {
    const response = await axios.get<TokenResponse>(url, {
      params: { command: REQUEST },
    });
    if (response.data.response_code === 0) {
      return response.data.token;
    }
    throw new Error(`Failed to request token: ${response.data.response_message}`);
  });
}

async function resetSessionToken(token: string): Promise<string> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.token}`;
  return fetchWithRetry(async () => {
    const response = await axios.get<TokenResponse>(url, {
      params: { command: RESET, token },
    });
    if (response.data.response_code === 0) {
      return response.data.token;
    }
    throw new Error(`Failed to reset token: ${response.data.response_message}`);
  });
}

async function fetchQuestions(
  amount: number = 50,
  token?: string
): Promise<TriviaResponse> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.questions}`;
  const params: Record<string, string | number> = {
    amount,
    type: MULTIPLE,
  };

  if (token) {
    params.token = token;
  }

  return fetchWithRetry(async () => {
    const response = await axios.get<TriviaResponse>(url, { params });
    return response.data;
  });
}

export { requestSessionToken, resetSessionToken, fetchQuestions };

