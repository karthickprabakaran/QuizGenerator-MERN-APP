import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
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
      <section className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            About SmartQuiz
          </h2>
          <p className="mb-4">
            SmartQuiz is an interactive and engaging quiz app designed to help users expand their knowledge while having fun. Whether you're competing with friends or tracking your personal progress, SmartQuiz offers a variety of quizzes to challenge your mind.
          </p>
          <p>
            With real-time leaderboards, multilingual support, and personalized analytics, SmartQuiz provides a unique and seamless experience across all devices. It's more than just a quiz app — it's an opportunity to learn, grow, and share your achievements.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
            alt="office content 2"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
