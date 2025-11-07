import CategoryChart from "./CategoryChart";
import DifficultyChart from "./DifficultyChart";
import CategoryList from "./CategoryList";
import CategoryFilter from "./CategoryFilter";
import type { CategoryStats, DifficultyStats, TriviaQuestion } from "../types";
import { groupByCategory } from "../helpers/dataProcessors";

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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Trivia Statistics
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400">
                Total Questions:
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {' '}{totalQuestions}
                </span>
              </p>
              {loadMoreQuestions && (
                <button
                  onClick={loadMoreQuestions}
                  disabled={loadingMore}
                  className="mt-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loadingMore ? 'Loading...' : 'Load More Questions'}
                </button>
              )}
            </div>
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      <CategoryList
        categories={categoryStatsForList}
        questionsByCategory={questionsByCategory}
      />

      <div
        className={`grid gap-6 ${
          selectedCategory ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {!selectedCategory && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6 transition-colors">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Questions by Category
            </h2>
            <CategoryChart data={categoryStatsForChart} />
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6 transition-colors">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Questions by Difficulty
          </h2>
          <DifficultyChart data={difficultyStats} />
        </div>
      </div>
    </div>
  );
}

export default StatsDashboard;
