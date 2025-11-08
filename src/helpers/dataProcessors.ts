import type { TriviaQuestion, CategoryStats, DifficultyStats } from '../types';
import { decodeHtmlEntities } from './htmlDecoder';

function groupByCategory(
  questions: TriviaQuestion[]
): Record<string, TriviaQuestion[]> {
  return questions.reduce(
    (acc, question) => {
      const category = decodeHtmlEntities(question.category);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(question);
      return acc;
    },
    {} as Record<string, TriviaQuestion[]>
  );
}

function groupByDifficulty(
  questions: TriviaQuestion[]
): Record<string, TriviaQuestion[]> {
  return questions.reduce(
    (acc, question) => {
      const difficulty = question.difficulty;
      if (!acc[difficulty]) {
        acc[difficulty] = [];
      }
      acc[difficulty].push(question);
      return acc;
    },
    {} as Record<string, TriviaQuestion[]>
  );
}

function calculateCategoryStats(
  questions: TriviaQuestion[],
  groupSmallCategories: boolean = false
): CategoryStats[] {
  const grouped = groupByCategory(questions);

  const allStats = Object.entries(grouped)
    .map(([category, categoryQuestions]) => ({
      category,
      count: categoryQuestions.length,
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

  if (!groupSmallCategories) {
    return allStats;
  }

  const totalQuestions = questions.length;
  const threshold = totalQuestions * 0.05; // 5% threshold

  const stats: CategoryStats[] = [];
  let otherQuestionsCount = 0;

  allStats.forEach((stat) => {
    if (stat.count >= threshold) {
      stats.push(stat);
    } else {
      otherQuestionsCount += stat.count;
    }
  });

  if (otherQuestionsCount > 0) {
    stats.push({
      category: 'Other',
      count: otherQuestionsCount,
    });
  }

  return stats;
}

function calculateDifficultyStats(
  questions: TriviaQuestion[]
): DifficultyStats[] {
  const grouped = groupByDifficulty(questions);
  return Object.entries(grouped)
    .map(([difficulty, difficultyQuestions]) => ({
      difficulty: difficulty as 'easy' | 'medium' | 'hard',
      count: difficultyQuestions.length,
    }))
    .sort((a, b) => {
      const order = { easy: 0, medium: 1, hard: 2 };
      return order[a.difficulty] - order[b.difficulty];
    });
}

export { groupByCategory, calculateCategoryStats, calculateDifficultyStats };
