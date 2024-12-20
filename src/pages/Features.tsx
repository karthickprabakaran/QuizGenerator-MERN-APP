import React from "react";
import { Link } from "react-router-dom";

const Features: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-transparent py-4 px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SmartQuiz</h1>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="text-gray-900 text-xl font-semibold hover:text-yellow-400 dark:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-900 text-xl font-semibold hover:text-yellow-400 dark:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-900 text-xl font-semibold hover:text-yellow-400 dark:text-white">
                  Features
                </Link>
              </li>
              
            </ul>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-6">
        <h2 className="mb-12 text-4xl font-extrabold text-gray-900 dark:text-white">
          Key Features of SmartQuiz
        </h2>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Interactive Quizzes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Engage in fun, interactive quizzes designed to test and expand your knowledge.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Real-Time Leaderboards
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Compete with others and see where you rank with live leaderboards.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Personalized Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track your progress and performance over time with personalized insights.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Multilingual Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access quizzes in multiple languages for a more inclusive experience.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Mobile-Friendly Design
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Seamless experience across devices, whether you're on a phone or desktop.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Easy Sharing
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Share your results and challenges with friends on social media.
            </p>
          </div>

          {/* Feature 7 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              User Authentication
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Login & Signup functionality for users to create accounts and log in securely.
            </p>
          </div>

          {/* Feature 8 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Form Validation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Validation for both the login and signup forms to ensure all necessary fields are correctly filled out before submission.
            </p>
          </div>

          {/* Feature 9 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Privilege-Based Page Rendering
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Different page content and access based on user roles (e.g., Admin vs. Regular User) for managing quiz creation, participation, and other features.
            </p>
          </div>

          {/* Feature 10 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Quiz Creation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Admin users can create and manage quizzes, defining questions, answers, and quiz structure.
            </p>
          </div>

          {/* Feature 11 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Attending Quizzes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Regular users can participate in quizzes, answering questions and receiving feedback based on their performance.
            </p>
          </div>

          {/* Feature 12 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              User Rank Board
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A rank board displaying users' ranks based on their quiz scores, encouraging competition and providing insights into performance.
            </p>
          </div>

          {/* Feature 13 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Password Hashing
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Passwords are hashed using bcrypt for secure storage, ensuring user data privacy.
            </p>
          </div>

          {/* Feature 14 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              CORS (Cross-Origin Resource Sharing)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              CORS configured to handle requests between different domains, enabling secure interaction between the front-end and back-end.
            </p>
          </div>

          {/* Feature 15 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Reusable React Components
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Application utilizes reusable React components to keep the code clean, modular, and maintainable.
            </p>
          </div>

          {/* Feature 16 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Efficient Error Handling
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Proper error handling throughout the app to provide clear feedback to users in case of failed requests or other issues.
            </p>
          </div>

          {/* Feature 17 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Usage of TypeScript
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The app is developed using TypeScript to enhance type safety, improve code quality, and provide better development experience with autocompletion and error checking at compile time.
            </p>
          </div>

          {/* Feature 18 */}
          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Improved User Interface
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The app provides a clean, modern, and user-friendly interface, ensuring users have a pleasant experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
