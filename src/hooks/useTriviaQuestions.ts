import { useState, useEffect, useRef } from 'react';
import type { TriviaQuestion } from '../types';
import { fetchQuestions } from '../helpers/apiHelpers';
import { MIN_QUESTIONS_REQUIRED } from '../constants';

export function useTriviaQuestions() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }

    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        hasFetchedRef.current = true;

        const data = await fetchQuestions(undefined, MIN_QUESTIONS_REQUIRED);
        
        if (data.response_code === 0) {
          setQuestions(data.results);
          setLoading(false);
        } else {
          if (data.results.length > 0) {
            setQuestions(data.results);
            setLoading(false);
          } else {
            throw new Error(`API returned response code: ${data.response_code}`);
          }
        }
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

  const refetch = async () => {
    hasFetchedRef.current = false;
    setQuestions([]);
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchQuestions(undefined, MIN_QUESTIONS_REQUIRED);
      if (data.response_code === 0) {
        setQuestions(data.results);
      } else if (data.results.length > 0) {
        setQuestions(data.results);
      } else {
        throw new Error(`API returned response code: ${data.response_code}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch questions'));
      setLoading(false);
    }
  };

  return { questions, loading, error, refetch };
}

