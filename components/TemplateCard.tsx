'use client';

import { Template } from '@/types';
import { useTemplateStore } from '@/lib/store';
import { formatDate, copyToClipboard } from '@/lib/utils';
import { useState } from 'react';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { isFavorite, toggleFavorite } = useTemplateStore();
  const [copied, setCopied] = useState(false);

  const favorite = isFavorite(template.id);

  const handleCopy = async () => {
    const success = await copyToClipboard(template.source.url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="card p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 truncate group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {template.title}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            by {template.author.name}
          </p>
        </div>
        <button
          onClick={() => toggleFavorite(template.id)}
          className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
            favorite
              ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className="w-5 h-5"
            fill={favorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
        {template.description}
      </p>

      {/* Category & Rating */}
      <div className="flex items-center justify-between mb-4">
        <span className="badge">
          {template.category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        </span>
        {template.rating > 0 && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(template.rating / 20)
                    ? 'text-accent-500'
                    : 'text-neutral-300 dark:text-neutral-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      {template.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="text-xs px-2 py-1 text-neutral-500 dark:text-neutral-400">
              +{template.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Meta & Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {formatDate(template.updatedAt)}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={`btn-secondary text-xs px-3 py-1.5 ${
              copied ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300' : ''
            }`}
          >
            {copied ? '✓ Copied' : 'Copy URL'}
          </button>
          <a
            href={template.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs px-3 py-1.5"
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
}
