import React from 'react';
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
    return <Outlet />;
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
