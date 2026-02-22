export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    url?: string;
    avatar?: string;
  };
  source: {
    url: string;
    type: 'github' | 'n8n-community' | 'other';
  };
  rating: number;
  downloads: number;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
  workflow?: {
    json: any;
    version: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
}

export interface SearchFilters {
  search: string;
  category: string | null;
  tags: string[];
  sortBy: 'relevant' | 'popular' | 'recent' | 'rating';
}
