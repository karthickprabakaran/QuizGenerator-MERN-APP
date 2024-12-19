import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout'; // Layout for consistent structure
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { CreateQuiz } from './pages/CreateQuiz';
import { TakeQuiz } from './pages/TakeQuiz';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root route */}
        <Route path="/" element={<Layout />}>
          {/* LandingPage should be the default page */}
          <Route index element={<LandingPage />} />  {/* Index route to render LandingPage */}
          
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route path="/quiz/:id" element={<TakeQuiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
