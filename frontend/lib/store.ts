import { create } from 'zustand';

interface LanguageState {
  lang: 'id' | 'en';
  setLang: (newLang: 'id' | 'en') => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: 'id', // Default bahasa Indonesia
  setLang: (newLang) => set({ lang: newLang }),
}));