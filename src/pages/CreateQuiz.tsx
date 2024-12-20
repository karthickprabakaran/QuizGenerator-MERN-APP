import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { useAuthStore } from '../store/authStore';
import { Question, Quiz } from '../types';
import { QuizForm } from '../components/quiz/QuizForm';
import { QuestionEditor } from '../components/quiz/QuestionEditor';

export function CreateQuiz() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore(); // Access authentication state
  const { addQuiz } = useQuizStore(); // Access quiz store
  const [quiz, setQuiz] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    category: '',
    displayMode: 'all',
    questions: [],
  });

  const handleQuizChange = (field: keyof Quiz, value: any) => {
    setQuiz((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    };
    setQuiz((prev) => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion],
    }));
  };

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions?.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    }));
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions?.filter((q) => q.id !== questionId),
    }));
  };

  const handleSaveQuiz = () => {
    console.log('quiz:', quiz);
  
    if (!quiz.title || !quiz.questions?.length) {
      console.log('Form is incomplete');
      return;
    }
  
    const newQuiz: Quiz = {
      id: crypto.randomUUID(),
      title: quiz.title,
      description: quiz.description || '',
      category: quiz.category || 'General',
      displayMode: quiz.displayMode || 'all',
      questions: quiz.questions,
      createdBy: user?.id || 'anonymous',
    };
  
    console.log('New quiz to be saved:', newQuiz);
  
    addQuiz(newQuiz);
    console.log('Quiz added to store:', newQuiz);
  
    navigate('/take-quizzes');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-40">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Quiz</h1>

      {/* Pass the quiz state and handle change inside the QuizForm component */}
      <QuizForm quiz={quiz} onChange={handleQuizChange} />

      <div className="mt-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Questions</h2>
          <button
            onClick={handleAddQuestion}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Question
          </button>
        </div>

        <div className="space-y-4">
          {quiz.questions?.map((question, index) => (
            <QuestionEditor
              key={question.id}
              question={question}
              index={index}
              onUpdate={handleUpdateQuestion}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSaveQuiz}
          disabled={!quiz.title || !quiz.questions?.length}
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Quiz
        </button>
      </div>
    </div>
  );
}
