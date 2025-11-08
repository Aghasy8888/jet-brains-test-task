import { useState, useMemo } from "react";
import { StatsDashboard } from "./components";
import { Spinner, ErrorModal } from "./common";
import { useTriviaQuestions } from "./hooks/useTriviaQuestions";
import { useTriviaStats } from "./hooks/useTriviaStats";
import { decodeHtmlEntities } from "./helpers/htmlDecoder";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    questions,
    loading: questionsLoading,
    loadingMore,
    error: questionsError,
    loadMoreQuestions,
  } = useTriviaQuestions();

  const {
    categoryStatsForChart,
    categoryStatsForList,
    difficultyStats,
    totalQuestions,
    filteredQuestions,
  } = useTriviaStats(questions, selectedCategory || undefined);

  const uniqueCategories = useMemo(() => {
    const categorySet = new Set<string>();
    questions.forEach((q) => {
      const decodedCategory = decodeHtmlEntities(q.category);
      categorySet.add(decodedCategory);
    });
    return Array.from(categorySet).sort();
  }, [questions]);

  if (questionsError) {
    const errorMessage =
      questionsError?.message ||
      "Failed to load data";

    return <ErrorModal message={errorMessage} />;
  }

  const isLoading = questionsLoading || questions.length === 0;

  if (isLoading) {
    const loadingMessage = questionsLoading
      ? "Loading questions..."
      : "Loading trivia data...";

    return <Spinner message={loadingMessage} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        <StatsDashboard
          categoryStatsForChart={categoryStatsForChart}
          categoryStatsForList={categoryStatsForList}
          difficultyStats={difficultyStats}
          categories={uniqueCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          totalQuestions={totalQuestions}
          questions={filteredQuestions}
          loadMoreQuestions={loadMoreQuestions}
          loadingMore={loadingMore}
        />
      </div>
    </main>
  );
}

export default App;
