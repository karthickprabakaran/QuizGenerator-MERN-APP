import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';

export function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useQuizStore();
  const quiz = quizzes.find((q) => q.id === id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Quiz not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer.toString()) {
        correct++;
      }
    });
    return (correct / quiz.questions.length) * 100;
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quiz Results</h2>
          <div className="mb-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-indigo-600 mb-2">
                {score.toFixed(0)}%
              </p>
              <p className="text-gray-600">
                You got {quiz.questions.filter(
                  (q) => answers[q.id] === q.correctAnswer.toString()
                ).length}{' '}
                out of {quiz.questions.length} questions correct
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {quiz.questions.map((question, index) => (
              <div
                key={question.id}
                className="p-4 border rounded-lg"
              >
                <p className="font-medium text-gray-900 mb-4">
                  {index + 1}. {question.question}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Your answer: {answers[question.id]}
                  </p>
                  <p className={`text-sm ${
                    answers[question.id] === question.correctAnswer.toString()
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    Correct answer: {question.correctAnswer.toString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    answers[currentQuestion.id] === option
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </button>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quiz.questions.length}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="h-5 w-5 mr-1" />
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}