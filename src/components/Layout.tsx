import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { NavLink } from './navigation/NavLink';
import { useAuthStore } from '../store/authStore';
import { UserNav } from './navigation/UserNav';

export function Layout() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Check if the current route is the landing page
  const isLandingPage = location.pathname === '/';

  // If it's the landing page, render only the Outlet without the header and any additional layout.
  if (isLandingPage) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conditionally render the header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <NavLink 
                to="/" 
                icon={ShieldCheck} 
                className="font-semibold"
              >
                <span className="flex items-center">
                  <span className="text-indigo-600">Quiz</span>
                  <span className="text-gray-900">Secure</span>
                </span>
              </NavLink>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <UserNav />
              ) : (
                <NavLink
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* This is where the child route will be rendered */}
        <Outlet />
      </main>
    </div>
  );
}

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
              <li><a href="http://localhost:5173/login" target='_blank' className="text-white text-xl font-semibold hover:text-yellow-400">About</a></li> {/* Updated to /login */}
              <li><a href="#features" className="text-white text-xl font-semibold hover:text-yellow-400">Features</a></li>
              <li><a href="#contact" className="text-white text-xl font-semibold hover:text-yellow-400">Contact</a></li>
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
