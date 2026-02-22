'use client';

import { useTemplateStore } from '@/lib/store';
import { useCallback } from 'react';

export function SearchBar() {
  const { filters, setFilters } = useTemplateStore();

  const handleChange = useCallback((value: string) => {
    setFilters({ search: value });
  }, [setFilters]);

  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search templates, keywords, categories..."
        value={filters.search}
        onChange={(e) => handleChange(e.target.value)}
        className="input pl-10"
      />
    </div>
  );
}
