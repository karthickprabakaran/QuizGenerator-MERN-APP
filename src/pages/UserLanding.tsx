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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Quizzes</h1>

      <div className="space-y-4">
        {quizzes.length === 0 ? (
          <p>Loading quizzes... or no quizzes available at the moment.</p>
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
              <div key={quiz.id} className="border p-4 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
                <p className="text-gray-600">{quiz.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={redirectPath}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
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
