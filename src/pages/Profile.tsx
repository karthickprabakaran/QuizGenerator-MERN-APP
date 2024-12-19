import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useQuizStore } from '../store/quizStore';

export function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { quizzes, deleteQuiz } = useQuizStore();

  const userQuizzes = quizzes.filter((quiz) => quiz.createdBy === user?.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-lg text-gray-900">{user?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Quizzes</h2>
        {userQuizzes.length === 0 ? (
          <p className="text-gray-600">You haven't created any quizzes yet.</p>
        ) : (
          <div className="space-y-4">
            {userQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {quiz.questions.length} questions · {quiz.category}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    className="p-2 text-indigo-600 hover:text-indigo-900"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    className="p-2 text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}