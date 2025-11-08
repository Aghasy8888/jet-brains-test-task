import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import type { TriviaQuestion, TriviaResponse } from '../types';
import {
  fetchQuestions,
  requestSessionToken,
  resetSessionToken,
} from '../helpers/apiHelpers';
import { QUESTIONS_PER_LOAD, RESPONSE_CODES } from '../constants';

export function useTriviaQuestions() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);
  const isHandlingTokenRef = useRef(false);

  const handleResponseCode = async (
    data: TriviaResponse,
    currentToken: string | null,
    requestedAmount: number = QUESTIONS_PER_LOAD
  ): Promise<TriviaQuestion[]> => {
    const { response_code, results } = data;

    if (response_code === RESPONSE_CODES.SUCCESS) {
      return results;
    }

    if (isHandlingTokenRef.current) {
      throw new Error('Token handling already in progress');
    }

    isHandlingTokenRef.current = true;

    try {
      switch (response_code) {
        case RESPONSE_CODES.NO_RESULTS: {
          if (requestedAmount > 1) {
            const reducedAmount = Math.floor(requestedAmount / 2);

            if (reducedAmount < 1) {
              toast.info('There are no more questions for this query');
              return [];
            }

            const retryData = await fetchQuestions(
              reducedAmount,
              currentToken || undefined
            );
            return handleResponseCode(retryData, currentToken, reducedAmount);
          } else {
            toast.info('There are no more questions for this query');
            return [];
          }
        }

        case RESPONSE_CODES.TOKEN_NOT_FOUND: {
          const newToken = await requestSessionToken();
          setSessionToken(newToken);
          const retryData = await fetchQuestions(QUESTIONS_PER_LOAD, newToken);
          return handleResponseCode(retryData, newToken);
        }

        case RESPONSE_CODES.TOKEN_EMPTY: {
          if (!currentToken) {
            throw new Error('Cannot reset token: no token available');
          }
          const newToken = await resetSessionToken(currentToken);
          setSessionToken(newToken);
          const retryData = await fetchQuestions(QUESTIONS_PER_LOAD, newToken);
          return handleResponseCode(retryData, newToken);
        }

        case RESPONSE_CODES.INVALID_PARAMETER: {
          throw new Error(
            'Invalid parameter: make sure to pass valid parameters to the API'
          );
        }

        default:
          throw new Error(`Unexpected API response code: ${response_code}`);
      }
    } finally {
      isHandlingTokenRef.current = false;
    }
  };

  const fetchQuestionsWithTokenHandling = async (
    token: string | null
  ): Promise<TriviaQuestion[]> => {
    const data = await fetchQuestions(QUESTIONS_PER_LOAD, token || undefined);
    return handleResponseCode(data, token);
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
        setError(
          err instanceof Error ? err : new Error('Failed to fetch questions')
        );
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
      toast.error('Failed to load more questions please retry.');
      return;
    }

    try {
      setLoadingMore(true);
      setError(null);

      const results = await fetchQuestionsWithTokenHandling(sessionToken);
      setQuestions((prev) => [...prev, ...results]);
      toast.success(`Successfully loaded ${results.length} more questions`);
    } catch (err) {
      console.warn(err);
      toast.error('Failed to load more questions please retry.');
    } finally {
      setLoadingMore(false);
    }
  };

  return { questions, loading, loadingMore, error, loadMoreQuestions };
}
