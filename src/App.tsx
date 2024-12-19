import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';  // Import the Layout component
import LandingPage from './pages/Landing';  // Ensure this is the correct import
import { Login } from './pages/Login';  // Import Login component
import { Profile } from './pages/Profile';  // Import Profile component
import { useAuthStore } from './store/authStore';  // Assuming your auth store is set up here
import { TakeQuiz } from './pages/TakeQuiz';
import { CreateQuiz } from './pages/CreateQuiz';
import { SignUp } from './pages/SignUp';


const App = () => {
  const { isAuthenticated } = useAuthStore();  // Get authentication status

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/takequiz" element={<TakeQuiz />} />
        <Route path="/createquiz" element={<CreateQuiz />} />

      </Routes>
    </Router>
  );
};

export default App;
