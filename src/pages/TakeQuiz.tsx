import { useQuizStore } from '../store/quizStore';
import { Link } from 'react-router-dom';

export function TakeQuiz() {
  const { quizzes } = useQuizStore(); // Fetch quizzes from the store

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Take Quizzes</h1>

      <div className="space-y-4">
        {quizzes.length === 0 ? (
          <p>No quizzes available yet. Create one to get started!</p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
              <p className="text-gray-600">{quiz.description}</p>
              <Link
                to={`/quiz/${quiz.id}`} // Redirect to the individual quiz page
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mt-4"
              >
                Take Quiz
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
