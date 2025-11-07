import { useState, useEffect, useRef } from 'react';
import type { TriviaQuestion } from '../types';
import { fetchQuestions, requestSessionToken, resetSessionToken } from '../helpers/apiHelpers';
import { QUESTIONS_PER_LOAD } from '../constants';

export function useTriviaQuestions() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  const fetchQuestionsWithTokenHandling = async (
    token: string | null
  ): Promise<TriviaQuestion[]> => {
    const data = await fetchQuestions(QUESTIONS_PER_LOAD, token || undefined);

    if (data.response_code === 4 && token) {
      try {
        const newToken = await resetSessionToken(token);
        setSessionToken(newToken);

        const retryData = await fetchQuestions(QUESTIONS_PER_LOAD, newToken);
        if (retryData.response_code === 0) {
          return retryData.results;
        } else if (retryData.results.length > 0) {
          return retryData.results;
        } else {
          throw new Error(`API returned response code: ${retryData.response_code}`);
        }
      } catch (resetError) {
        try {
          const newToken = await requestSessionToken();
          setSessionToken(newToken);
          const newData = await fetchQuestions(QUESTIONS_PER_LOAD, newToken);
          if (newData.response_code === 0) {
            return newData.results;
          } else if (newData.results.length > 0) {
            return newData.results;
          } else {
            throw new Error(`API returned response code: ${newData.response_code}`);
          }
        } catch (newTokenError) {
          throw new Error('Failed to manage session token');
        }
      }
    } else if (data.response_code === 0) {
      return data.results;
    } else if (data.results.length > 0) {
      return data.results;
    } else {
      throw new Error(`API returned response code: ${data.response_code}`);
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }

    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        hasFetchedRef.current = true;

        let token: string | null = null;
        try {
          token = await requestSessionToken();
          setSessionToken(token);
        } catch (tokenError) {
          console.warn('Failed to request session token:', tokenError);
        }

        const results = await fetchQuestionsWithTokenHandling(token);
        setQuestions(results);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch questions'));
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && loading) {
      setLoading(false);
    }
  }, [questions.length, loading]);

  const loadMoreQuestions = async () => {
    if (!sessionToken) {
      setError(new Error('Session token not available. Please refresh the page.'));
      return;
    }

    try {
      setLoadingMore(true);
      setError(null);

      const results = await fetchQuestionsWithTokenHandling(sessionToken);
      setQuestions((prev) => [...prev, ...results]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more questions'));
    } finally {
      setLoadingMore(false);
    }
  };

  return { questions, loading, loadingMore, error, loadMoreQuestions };
}

