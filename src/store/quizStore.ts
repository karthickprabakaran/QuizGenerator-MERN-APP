import { create } from 'zustand';
import { Quiz } from '../types';

interface QuizState {
  quizzes: Quiz[];
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  duplicateQuiz: (id: string) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizzes: [],
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  updateQuiz: (quiz) =>
    set((state) => ({
      quizzes: state.quizzes.map((q) => (q.id === quiz.id ? quiz : q)),
    })),
  deleteQuiz: (id) =>
    set((state) => ({
      quizzes: state.quizzes.filter((q) => q.id !== id),
    })),
  duplicateQuiz: (id) =>
    set((state) => {
      const quiz = state.quizzes.find((q) => q.id === id);
      if (!quiz) return state;
      const newQuiz = {
        ...quiz,
        id: crypto.randomUUID(),
        title: `${quiz.title} (Copy)`,
      };
      return { quizzes: [...state.quizzes, newQuiz] };
    }),
}));