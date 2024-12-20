import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export function UserLanding() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const sampleQuizzes: Quiz[] = [
    {
      id: '1',
      title: 'Operating System Basics',
      description: 'A basic quiz on Operating System.',
      questions: [
        {
          question: 'What is the output of 2 + 2?',
          options: ['4', '22', 'Undefined', 'NaN'],
          correctAnswer: '4',
        },
        {
          question: 'What is the correct syntax for a function in JavaScript?',
          options: ['function() {}', 'def() {}', 'func() {}', 'function[] {}'],
          correctAnswer: 'function() {}',
        },
      ],
    },
    {
      id: '2',
      title: 'Computer Science Fundamentals',
      description: 'Test your knowledge of Computer.',
      questions: [
        {
          question: 'What does HTML stand for?',
          options: [
            'Hyper Text Markup Language',
            'High Text Markup Language',
            'Hyper Text Modeling Language',
            'None of the above',
          ],
          correctAnswer: 'Hyper Text Markup Language',
        },
        {
          question: 'Which HTML tag is used to define an internal style sheet?',
          options: ['<style>', '<css>', '<script>', '<link>'],
          correctAnswer: '<style>',
        },
      ],
    },
    {
      id: '3',
      title: 'Data Structures and Algorithms',
      description: 'Challenge your understanding of data structures and algorithms.',
      questions: [
        {
          question: 'Which of the following is a linear data structure?',
          options: ['Array', 'Binary Tree', 'Graph', 'Hash Table'],
          correctAnswer: 'Array',
        },
        {
          question: 'What is the time complexity of binary search?',
          options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
          correctAnswer: 'O(log n)',
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setQuizzes(sampleQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12">
      {/* Updated Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-transparent py-4 px-8">
        <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600">Quiz Portal</h1>
        <nav>
            <ul className="flex space-x-8">
              <li>
                <Link to="/" target='_new' className=" text-xl text-indigo-600 font-semibold hover:text-yellow-400 ">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" target='_new' className="text-indigo-600 text-xl font-semibold hover:text-yellow-400 ">
                  About
                </Link>
              </li>
              <li>
                <Link to="/features" target='_new' className="text-indigo-600 text-xl font-semibold hover:text-yellow-400 ">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/dashboard" target='_new' className="text-indigo-600 text-xl font-semibold hover:text-yellow-400 ">
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Quizzes Section */}
      <div className="w-full max-w-3xl space-y-6 mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Available Quizzes</h2>
        
        {quizzes.length === 0 ? (
          <p className="text-gray-700 text-center">Loading quizzes... or no quizzes available at the moment.</p>
        ) : (
          quizzes.map((quiz) => {
            // Determine redirection path based on quiz ID
            const redirectPath =
              quiz.id === '1'
                ? `/AttendQuiz` // Redirect to AttendQuiz for quiz ID 1
                : quiz.id === '2'
                ? `/computer` // Redirect to Computer for quiz ID 2
                : `/dsa`; // Redirect to DS & Algo for quiz ID 3

            return (
              <div key={quiz.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 mb-4">{quiz.description}</p>
                <div className="flex justify-center">
                  <Link
                    to={redirectPath}
                    className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Attend Quiz
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
