import { Dropdown } from '../common';
import type { DropdownOption } from '../types';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const options: DropdownOption<string | null>[] = [
    { value: null, label: 'All Categories' },
    ...categories.map((category) => ({ value: category, label: category })),
  ];

  return (
    <div>
      <label
        htmlFor="category-filter"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Filter by Category
      </label>
      <Dropdown<string | null>
        id="category-filter"
        options={options}
        value={selectedCategory}
        onChange={onCategoryChange}
        placeholder="All Categories"
        className="w-full max-w-md"
      />
    </div>
  );
}

export default CategoryFilter;
