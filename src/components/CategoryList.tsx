import { useState } from 'react';
import type { CategoryStats, TriviaQuestion } from '../types';
import { ChevronDownIcon, NoDataMessage } from '../common';
import QuestionList from './QuestionList';
import { CATEGORIES } from '../constants';
import { useStickyCategory } from '../hooks/useStickyCategory';

interface CategoryListProps {
  categories: CategoryStats[];
  questionsByCategory: Record<string, TriviaQuestion[]>;
}

function CategoryList({ categories, questionsByCategory }: CategoryListProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const { activeStickyCategory, scrollContainerRef, registerCategoryRef } =
    useStickyCategory(openCategories);

  if (categories.length === 0) {
    return <NoDataMessage dataName={CATEGORIES} />;
  }

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const onCategoryKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    category: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCategory(category);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors border border-slate-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-gray-100">
        Categories
      </h2>
      <div
        ref={scrollContainerRef}
        className="max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto custom-scrollbar pb-6"
      >
        <div className="space-y-2">
          {categories.map((category) => {
            const isOpen = openCategories.has(category.category);
            const questions = questionsByCategory[category.category] || [];
            const isActiveSticky =
              activeStickyCategory === category.category && isOpen;

            return (
              <div
                key={category.category}
                ref={registerCategoryRef(category.category)}
                data-category={category.category}
                className="border border-slate-200 dark:border-gray-700 rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category.category)}
                  onKeyDown={(e) => onCategoryKeyDown(e, category.category)}
                  aria-expanded={isOpen}
                  aria-controls={`category-${category.category}`}
                  className={`relative ${isOpen ? 'rounded-t-lg' : 'rounded-lg'} ${isActiveSticky ? 'sticky top-0 z-10 bg-blue-50 dark:bg-gray-700' : 'bg-blue-50/50 dark:bg-gray-700'} w-full flex items-center justify-between p-4 hover:bg-blue-100/70 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out text-left focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-inset`}
                >
                  <span className="text-slate-700 dark:text-gray-200 text-sm sm:text-base font-medium pr-1 sm:pr-0">
                    {category.category}
                  </span>
                  <div className="flex items-center gap-1 sm:gap-3">
                    <span className="absolute top-0.5 right-1 sm:relative sm:right-0 text-[0.75rem] sm:text-base text-blue-600 dark:text-blue-400 font-semibold">
                      <span className="inline sm:hidden">{'['}</span>
                      {category.count}
                      <span className="inline sm:hidden">{']'}</span>
                      <span className="hidden sm:inline"> questions</span>
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-slate-500 dark:text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                <div
                  id={`category-${category.category}`}
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'max-h-[5000px] opacity-100'
                      : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
                  }`}
                >
                  <div className="p-4 bg-slate-50 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700">
                    <QuestionList questions={questions} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
