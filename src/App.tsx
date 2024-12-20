import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';  // Import the Layout component
import LandingPage from './pages/Landing';  // Ensure this is the correct import
import { Login } from './pages/Login';  // Import Login component
import { useAuthStore } from './store/authStore';  // Assuming your auth store is set up here
import { CreateQuiz } from './pages/CreateQuiz';
import { SignUp } from './pages/SignUp';
import { TakeQuiz } from './pages/TakeQuiz';
import { UserLanding } from './pages/UserLanding';
import { AttendQuiz } from './pages/AttendQuiz';
import { ComputerQuiz } from './pages/computer';
import { DSAQuiz } from './pages/DSA';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Features from './pages/Features';


const App = () => {
  useAuthStore();  // Get authentication status

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/takequiz" element={<TakeQuiz />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/take-quizzes" element={<TakeQuiz />} />
        <Route path="/user" element={<UserLanding />} />
        <Route path="/AttendQuiz" element={<AttendQuiz />} />
        <Route path="/quiz/:quizId" element={<AttendQuiz />} />
        <Route path="/computer" element={<ComputerQuiz />} />
        <Route path="/dsa" element={<DSAQuiz />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />




      </Routes>
    </Router>
  );
};

export default App;
