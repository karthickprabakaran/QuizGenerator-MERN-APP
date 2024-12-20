import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

export function ComputerQuiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Basic Computer Quiz JSON
  const quizzes: Quiz[] = [
    {
      id: 'computer',
      title: 'Basic Computer Quiz',
      description: 'Test your knowledge on basic computer concepts!',
      questions: [
        {
          question: 'What does CPU stand for?',
          options: [
            'Central Processing Unit',
            'Computer Personal Unit',
            'Central Programming Unit',
            'Central Process Utility',
          ],
          correctAnswer: 'Central Processing Unit',
        },
        {
          question: 'Which device is used as the primary input device for a computer?',
          options: ['Monitor', 'Keyboard', 'Printer', 'Scanner'],
          correctAnswer: 'Keyboard',
        },
        {
          question: 'Which of the following is not a type of software?',
          options: ['System Software', 'Application Software', 'Middleware', 'Printer Software'],
          correctAnswer: 'Printer Software',
        },
        {
          question: 'What is the binary equivalent of the decimal number 10?',
          options: ['1010', '1110', '1001', '1011'],
          correctAnswer: '1010',
        },
        {
          question: 'Which key combination is used to copy selected text?',
          options: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'],
          correctAnswer: 'Ctrl + C',
        },
      ],
    },
  ];

  useEffect(() => {
    if (!quizId) {
      setQuiz(quizzes[0]);
      setAnswers(new Array(quizzes[0].questions.length).fill(''));
      setLoading(false);
    } else {
      const foundQuiz = quizzes.find((q: Quiz) => q.id === quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        setAnswers(new Array(foundQuiz.questions.length).fill(''));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [quizId]);

  const handleAnswerChange = (index: number, answer: string) => {
    if (!quizCompleted) {
      const newAnswers = [...answers];
      newAnswers[index] = answer;
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quiz?.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });
    setResult({ correct: correctAnswers, total: quiz?.questions.length ?? 0 });
    setQuizCompleted(true);
  };

  if (loading) return <p className="text-center text-xl font-semibold text-gray-600">Loading quiz...</p>;
  if (!quiz) return <p className="text-center text-xl font-semibold text-red-600">Quiz not found! Please check the URL or quizId.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{quiz.title}</h1>
      <p className="text-lg text-gray-700 mb-8">{quiz.description}</p>

      {quiz.questions.map((question, index) => (
        <div key={index} className="border-b-2 pb-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{question.question}</h3>
          <div className="space-y-4 mt-4">
            {question.options.map((option, i) => (
              <div key={i} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}-${i}`}
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                  disabled={quizCompleted}
                  className="mr-3 w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={`option-${index}-${i}`} className="text-lg text-gray-600 cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-gray-300 transition-colors"
          disabled={quizCompleted}
        >
          {quizCompleted ? 'Quiz Completed' : 'Submit Answers'}
        </button>
      </div>

      {result && (
        <div className="mt-8 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Results</h4>
          <p className="text-lg text-gray-700">
            You answered {result.correct} out of {result.total} questions correctly.
          </p>
          {result.correct === result.total ? (
            <p className="text-green-600 mt-2 font-semibold">Great job! You got all answers right!</p>
          ) : result.correct / result.total >= 0.5 ? (
            <p className="text-yellow-600 mt-2 font-semibold">Good job! You scored above 50%.</p>
          ) : (
            <p className="text-red-600 mt-2 font-semibold">Keep practicing, you can do better!</p>
          )}
        </div>
      )}
    </div>
  );
}
