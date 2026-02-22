import { create } from 'zustand';
import { Template, SearchFilters } from '@/types';

interface TemplateStore {
  templates: Template[];
  favorites: Set<string>;
  filters: SearchFilters;
  isDarkMode: boolean;
  
  setTemplates: (templates: Template[]) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  toggleDarkMode: () => void;
}

const defaultFilters: SearchFilters = {
  search: '',
  category: null,
  tags: [],
  sortBy: 'relevant',
};

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: [],
  favorites: new Set(),
  filters: defaultFilters,
  isDarkMode: false,

  setTemplates: (templates) => set({ templates }),

  toggleFavorite: (id) =>
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return { favorites: newFavorites };
    }),

  isFavorite: (id) => get().favorites.has(id),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () =>
    set({
      filters: defaultFilters,
    }),

  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return { isDarkMode: newMode };
    }),
}));
