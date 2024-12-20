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

export function AttendQuiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Inbuilt OS quiz JSON
  const quizzes: Quiz[] = [
    {
      id: 'os',
      title: 'Operating Systems Quiz',
      description: 'Test your knowledge on operating systems!',
      questions: [
        {
          question: 'Which of the following is a system software?',
          options: ['Microsoft Excel', 'Linux', 'Google Chrome', 'Photoshop'],
          correctAnswer: 'Linux',
        },
        {
          question: 'What is the primary purpose of an operating system?',
          options: [
            'To provide entertainment',
            'To manage hardware and software resources',
            'To connect to the internet',
            'To compile code',
          ],
          correctAnswer: 'To manage hardware and software resources',
        },
        {
          question: 'Which of these is not an operating system?',
          options: ['Windows', 'Unix', 'Java', 'MacOS'],
          correctAnswer: 'Java',
        },
        {
          question: 'What is virtual memory?',
          options: [
            'A memory management technique',
            'A physical memory',
            'A type of storage device',
            'An external device',
          ],
          correctAnswer: 'A memory management technique',
        },
        {
          question: 'Which of the following scheduling algorithms gives the minimum average waiting time?',
          options: [
            'First-Come, First-Served',
            'Shortest Job Next',
            'Round Robin',
            'Priority Scheduling',
          ],
          correctAnswer: 'Shortest Job Next',
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
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">{question.question}</h3>
          <div className="space-y-4 mt-4">
            {question.options.map((option, i) => (
              <div key={i} className="flex items-center space-x-3 hover:bg-indigo-50 transition-colors rounded-lg p-3">
                <input
                  type="radio"
                  id={`option-${index}-${i}`}
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                  disabled={quizCompleted}
                  className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
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
