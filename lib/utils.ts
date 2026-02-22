import { Template } from '@/types';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  
  return date.toLocaleDateString();
}

export function truncate(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + '...' : text;
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
}

export function sortTemplates(
  templates: Template[],
  sortBy: 'relevant' | 'popular' | 'recent' | 'rating'
): Template[] {
  const sorted = [...templates];

  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    case 'recent':
      return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'relevant':
    default:
      return sorted;
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateGradient(seed: string): { from: string; to: string } {
  const gradients = [
    { from: 'from-accent-400', to: 'to-accent-600' },
    { from: 'from-emerald-400', to: 'to-emerald-600' },
    { from: 'from-indigo-400', to: 'to-indigo-600' },
    { from: 'from-rose-400', to: 'to-rose-600' },
    { from: 'from-amber-400', to: 'to-amber-600' },
  ];

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }

  return gradients[Math.abs(hash) % gradients.length];
}
