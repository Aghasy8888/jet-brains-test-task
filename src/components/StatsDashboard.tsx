import { lazy, Suspense } from 'react';
import CategoryList from './CategoryList';
import CategoryFilter from './CategoryFilter';
import type { CategoryStats, DifficultyStats, TriviaQuestion } from '../types';
import { groupByCategory } from '../helpers/dataProcessors';

const CategoryChart = lazy(() => import('./CategoryChart'));
const DifficultyChart = lazy(() => import('./DifficultyChart'));

interface StatsDashboardProps {
  categoryStatsForChart: CategoryStats[];
  categoryStatsForList: CategoryStats[];
  difficultyStats: DifficultyStats[];
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  totalQuestions: number;
  questions: TriviaQuestion[];
  loadMoreQuestions?: () => Promise<void>;
  loadingMore?: boolean;
}

function StatsDashboard({
  categoryStatsForChart,
  categoryStatsForList,
  difficultyStats,
  categories,
  selectedCategory,
  onCategoryChange,
  totalQuestions,
  questions,
  loadMoreQuestions,
  loadingMore = false,
}: StatsDashboardProps) {
  const questionsByCategory = groupByCategory(questions);

  return (
    <div className="space-y-8">
      <header className="bg-slate-50 dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors border border-slate-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
          {loadMoreQuestions && (
            <button
              onClick={loadMoreQuestions}
              disabled={loadingMore}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-2 shadow-sm hover:shadow-md"
            >
              {loadingMore ? 'Loading...' : 'Load More Questions'}
            </button>
          )}
          <div className="flex items-center gap-4 order-1 sm:order-3">
            <div className="text-left sm:text-right">
              <h1 className="text-xl sm:text-3xl font-bold text-slate-800 dark:text-gray-100">
                Trivia Statistics
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 dark:text-gray-400">
                Total Questions:
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {' '}
                  {totalQuestions}
                </span>
              </p>
            </div>
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </header>

      <CategoryList
        categories={categoryStatsForList}
        questionsByCategory={questionsByCategory}
      />

      <div
        className={`grid gap-6 ${
          selectedCategory ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
        }`}
      >
        {!selectedCategory && (
          <section className="bg-slate-50 dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6 transition-colors border border-slate-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-gray-100">
              Questions by Category
            </h2>
            <Suspense fallback={null}>
              <CategoryChart data={categoryStatsForChart} />
            </Suspense>
          </section>
        )}

        <section className="bg-slate-50 dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6 transition-colors border border-slate-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-gray-100">
            Questions by Difficulty
          </h2>
          <Suspense fallback={null}>
            <DifficultyChart data={difficultyStats} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export default StatsDashboard;
