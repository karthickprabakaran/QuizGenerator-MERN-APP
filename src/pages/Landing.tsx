import React, { useEffect, useRef } from 'react';

const LandingPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const openInNewTab = (url: string) => {
    window.open(url, '_blank');  // Opens the URL in a new tab
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-20 bg-transparent py-4 px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">SmartQuiz</h1>
          <nav>
            <ul className="flex space-x-8">
              <li><a href="http://localhost:5173/about" target='_blank' className="text-white text-xl font-semibold hover:text-yellow-400">About</a></li> {/* Updated to /login */}
              <li><a href="http://localhost:5173/features" target='_blank' className="text-white text-xl font-semibold hover:text-yellow-400">Features</a></li>
              <li><a href="http://localhost:5173/login" target='_blank' className="text-white text-xl font-semibold hover:text-yellow-400">Login</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          className="object-cover object-center w-full h-full"
        >
          <source
            src="https://videos.pexels.com/video-files/5527786/5527786-sd_640_360_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">Test Your Knowledge with Our Quiz App</h1>
        <p className="text-lg text-gray-300 mb-8">
          Challenge yourself with a variety of fun and engaging quizzes. How well do you know the world?
        </p>
        <button
          onClick={() => openInNewTab('http://localhost:5173/login')}  // Using the relative path
          className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
