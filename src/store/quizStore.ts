// In your quiz store (e.g., quizStore.ts)

import create from 'zustand';
import { Quiz } from '../types';

interface QuizStore {
  quizzes: Quiz[];
  addQuiz: (newQuiz: Quiz) => void;
  setQuizzes: (quizzes: Quiz[]) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizzes: [],
  addQuiz: (newQuiz: Quiz) => set((state) => ({ quizzes: [...state.quizzes, newQuiz] })),
  setQuizzes: (quizzes: Quiz[]) => set({ quizzes }),
}));
