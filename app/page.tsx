'use client';

import { useEffect, useState, useCallback } from 'react';
import { Template, Category } from '@/types';
import { useTemplateStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { TemplateGrid } from '@/components/TemplateGrid';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const { templates, setTemplates, filters } = useTemplateStore();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/templates');
      const data = await response.json();

      if (data.success) {
        setTemplates(data.templates);
        setCategories(data.categories);

        // Extract all unique tags
        const tags = new Set<string>();
        data.templates.forEach((template: Template) => {
          template.tags.forEach((tag) => tags.add(tag));
        });
        setAllTags(Array.from(tags).sort());
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  }, [setTemplates]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
            N8N Workflow Templates
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Discover beautiful, production-ready N8N automation workflows. Search, filter, and copy templates to jumpstart your automation journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-8 h-8 border-3 border-neutral-200 dark:border-neutral-700 border-t-accent-600 dark:border-t-accent-500 rounded-full animate-spin mb-3" />
            <p className="text-neutral-600 dark:text-neutral-400">Loading templates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <FilterPanel
                  categories={categories}
                  allTags={allTags}
                />
              </div>
            </div>

            {/* Templates Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Showing{' '}
                  <span className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {templates.length}
                  </span>{' '}
                  templates
                </p>
              </div>
              <TemplateGrid templates={templates} filters={filters} />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 sm:mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            <p className="mb-2">
              Built with ❤️ for the N8N community
            </p>
            <p>
              <a href="https://github.com/enescingoz/awesome-n8n-templates" target="_blank" rel="noopener noreferrer" className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                Original Templates Repository
              </a>
              {' '} • {' '}
              <a href="https://github.com/sudosuraj/awesome-n8n" target="_blank" rel="noopener noreferrer" className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                This Project
              </a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
