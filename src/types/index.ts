export type User = {
  id: string;
  email: string;
  name: string;
};

export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer';

export type Question = {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation?: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  questions: Question[];
  displayMode: 'single' | 'all';
  category: string;
};