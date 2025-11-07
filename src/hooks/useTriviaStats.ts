import { useMemo } from 'react';
import type { TriviaQuestion } from '../types';
import {
  calculateCategoryStats,
  calculateDifficultyStats,
} from '../helpers/dataProcessors';
import { decodeHtmlEntities } from '../helpers/htmlDecoder';

export function useTriviaStats(
  questions: TriviaQuestion[],
  filterCategory?: string
) {
  const filteredQuestions = useMemo(() => {
    if (!filterCategory) {
      return questions;
    }
    
    return questions.filter((q) => decodeHtmlEntities(q.category) === filterCategory);
  }, [questions, filterCategory]);

  const categoryStatsForChart = useMemo(
    () => calculateCategoryStats(filteredQuestions, true),
    [filteredQuestions]
  );

  const categoryStatsForList = useMemo(
    () => calculateCategoryStats(filteredQuestions, false),
    [filteredQuestions]
  );

  const difficultyStats = useMemo(
    () => calculateDifficultyStats(filteredQuestions),
    [filteredQuestions]
  );

  return {
    categoryStatsForChart,
    categoryStatsForList,
    difficultyStats,
    totalQuestions: filteredQuestions.length,
    filteredQuestions,
  };
}

