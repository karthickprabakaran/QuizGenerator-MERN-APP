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
    // Log to check the current state of quiz, etc.
    console.log('quiz:', quiz);
  
    // Check if the quiz title and questions are provided
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
      createdBy: user?.id || 'anonymous', // Set as 'anonymous' or any default value if user is not authenticated
    };
  
    // Log to ensure quiz is being created correctly
    console.log('New quiz to be saved:', newQuiz);
  
    // Add quiz to store
    addQuiz(newQuiz); // Save quiz to the store
  
    // Confirm quiz is added
    console.log('Quiz added to store:', newQuiz);
  
    // Redirect to home page
    navigate('/takequiz');
  };
  

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Quiz</h1>

      <QuizForm quiz={quiz} onChange={handleQuizChange} />

      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
          <button
            onClick={handleAddQuestion}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Question
          </button>
        </div>

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

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSaveQuiz}
          disabled={!quiz.title || !quiz.questions?.length}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Quiz
        </button>
      </div>
    </div>
  );
}
