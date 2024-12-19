import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { UserPlus } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { FormInput } from '../components/auth/FormInput';
import { SubmitButton } from '../components/auth/SubmitButton';
import axios from 'axios';

export function SignUp() {
  const [name, setName] = useState(''); // State for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const navigate = useNavigate(); // For navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null); // Clear previous error
    setIsLoading(true); // Start loading
  
    try {
      // Send name, email, and password to the backend
      const response = await axios.post('http://localhost:5001/signup', {
        name,
        email,
        password,
      });
  
      // Handle success
      console.log('Signup successful:', response.data);
      setSuccessMessage('Signup successful! Redirecting to login page...');
      
      // Redirect after 3 seconds to give time for the success message to be visible
      setTimeout(() => {
        navigate('/login');
      }, 3000); 
    } catch (error: any) {
      // Handle API error
      if (error.response && error.response.data) {
        setApiError(error.response.data.message);
      } else {
        setApiError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {/* Display any general API errors */}
        {apiError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{apiError}</p>
          </div>
        )}

        {/* Display success message */}
        {successMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Name Input */}
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Full Name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email Input */}
          <FormInput
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            label="Email address"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <FormInput
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <SubmitButton
          text="Sign up"
          icon={UserPlus}
          isLoading={isLoading}
        />

        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
