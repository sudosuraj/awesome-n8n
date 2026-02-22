'use client';

import { Template, SearchFilters } from '@/types';
import { TemplateCard } from './TemplateCard';
import { sortTemplates } from '@/lib/utils';
import { useMemo } from 'react';

interface TemplateGridProps {
  templates: Template[];
  filters: SearchFilters;
}

export function TemplateGrid({ templates, filters }: TemplateGridProps) {
  const filteredAndSorted = useMemo(() => {
    let results = [...templates];

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      results = results.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.category) {
      results = results.filter((t) => t.category === filters.category);
    }

    // Tags filter
    if (filters.tags.length > 0) {
      results = results.filter((t) =>
        filters.tags.some((tag) => t.tags.includes(tag))
      );
    }

    // Sort
    results = sortTemplates(results, filters.sortBy);

    return results;
  }, [templates, filters]);

  if (filteredAndSorted.length === 0) {
    return (
      <div className="col-span-full py-12 text-center">
        <svg className="mx-auto w-12 h-12 text-neutral-300 dark:text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
          No templates found
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {filteredAndSorted.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
