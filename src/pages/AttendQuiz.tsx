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

  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found! Please check the URL or quizId.</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{quiz.title}</h1>

      {quiz.questions.map((question, index) => (
        <div key={index} className="border p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">{question.question}</h3>
          {question.options.map((option, i) => (
            <div key={i} className="mb-2">
              <input
                type="radio"
                id={`option-${index}-${i}`}
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleAnswerChange(index, option)}
                disabled={quizCompleted}
                className="mr-2"
              />
              <label htmlFor={`option-${index}-${i}`} className="text-gray-600">{option}</label>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mt-4"
        disabled={quizCompleted}
      >
        {quizCompleted ? 'Quiz Completed' : 'Submit Answers'}
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded-md shadow-sm">
          <h4 className="text-lg font-semibold">Results</h4>
          <p>
            You answered {result.correct} out of {result.total} questions correctly.
          </p>
          {result.correct === result.total ? (
            <p className="text-green-600">Great job! You got all answers right!</p>
          ) : result.correct / result.total >= 0.5 ? (
            <p className="text-yellow-600">Good job! You scored above 50%.</p>
          ) : (
            <p className="text-red-600">Keep practicing, you can do better!</p>
          )}
        </div>
      )}
    </div>
  );
}
