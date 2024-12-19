import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { FormInput } from '../components/auth/FormInput';
import { SubmitButton } from '../components/auth/SubmitButton';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';  // Import axios for API calls

export function SignUp() {
  const { handleSignup, isLoading, errors } = useAuth(); // Custom hook for handling signup logic (can be used for frontend state management)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);  // State to store API errors

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset any previous API error
    setApiError(null);

    try {
      // Make API call to the backend signup route
      const response = await axios.post('http://localhost:5001/signup', { name, email, password });

      // Handle success - trigger success action like redirecting or setting state
      console.log('Signup successful:', response.data);
      // Optionally, redirect user after signup
      // history.push('/login'); // if you are using react-router

    } catch (error: any) {
      // Handle API error
      if (error.response && error.response.data) {
        setApiError(error.response.data.message);  // Display error from the backend
      } else {
        setApiError('An unexpected error occurred. Please try again.');
      }
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

        {/* Display validation errors if any */}
        {errors.general && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Full Name Input */}
          <FormInput
            id="name"
            name="name"
            type="text"
            required
            label="Full name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
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
            error={errors.email}
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
            error={errors.password}
          />
        </div>

        {/* Submit Button */}
        <SubmitButton
          text="Sign up"
          icon={UserPlus}
          isLoading={isLoading}  // Indicates whether the signup request is in progress
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
