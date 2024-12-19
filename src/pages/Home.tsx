import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, BookOpen } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { useAuthStore } from '../store/authStore';

export function Home() {
  const { quizzes } = useQuizStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Quizzes</h1>
        {isAuthenticated && (
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Quiz
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {quiz.title}
            </h3>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {quiz.category}
              </span>
              <Link
                to={`/quiz/${quiz.id}`}
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Take Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No quizzes available yet
          </h3>
          <p className="text-gray-600">
            {isAuthenticated
              ? "Start by creating your first quiz!"
              : "Login to create your first quiz!"}
          </p>
        </div>
      )}
    </div>
  );
}