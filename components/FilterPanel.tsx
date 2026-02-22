'use client';

import { useTemplateStore } from '@/lib/store';
import { useCallback } from 'react';

interface FilterPanelProps {
  categories: Array<{ id: string; name: string; count: number }>;
  allTags: string[];
}

export function FilterPanel({ categories, allTags }: FilterPanelProps) {
  const { filters, setFilters, resetFilters } = useTemplateStore();

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      setFilters({ category: filters.category === categoryId ? null : categoryId });
    },
    [filters.category, setFilters]
  );

  const handleTagToggle = useCallback(
    (tag: string) => {
      const newTags = filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag];
      setFilters({ tags: newTags });
    },
    [filters.tags, setFilters]
  );

  const handleSortChange = useCallback(
    (sortBy: 'relevant' | 'popular' | 'recent' | 'rating') => {
      setFilters({ sortBy });
    },
    [setFilters]
  );

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
          Sort By
        </h3>
        <div className="space-y-2">
          {(['relevant', 'popular', 'recent', 'rating'] as const).map((sort) => (
            <label key={sort} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                value={sort}
                checked={filters.sortBy === sort}
                onChange={() => handleSortChange(sort)}
                className="w-4 h-4 rounded accent-accent-600 dark:accent-accent-500"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300 capitalize">
                {sort}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4" />

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
          Categories
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="w-4 h-4 rounded accent-accent-600 dark:accent-accent-500"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {category.name}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                ({category.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4" />

      {/* Tags */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 12).map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filters.tags.includes(tag)
                  ? 'bg-accent-600 dark:bg-accent-500 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4" />

      {/* Reset */}
      {(filters.search || filters.category || filters.tags.length > 0) && (
        <button
          onClick={resetFilters}
          className="btn-secondary w-full text-sm"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
