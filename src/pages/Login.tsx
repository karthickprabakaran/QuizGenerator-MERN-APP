import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { FormInput } from '../components/auth/FormInput';
import { SubmitButton } from '../components/auth/SubmitButton';
import axios from 'axios';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ general: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { general: '', email: '', password: '' };

    // Basic form validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors and success message before submission
    setIsLoading(true);
    setErrors({ general: '', email: '', password: '' });
    setSuccessMessage('');
  
    // Validate form fields before proceeding
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
  
    try {
      // Make the login API call
      const response = await axios.post('http://localhost:5001/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        // Check if login response contains specific success data, e.g., a token or user info
        setSuccessMessage('Login successful!');
        console.log('Login successful'); // For debugging
  
        // Set a timeout for redirection
        setTimeout(() => {
          console.log('Navigating based on email domain'); // For debugging
  
          // Check if email contains 'saveetha.in'
          if (email.includes('saveetha.in')) {
            navigate('/createQuiz');  // Redirect to createQuiz route
          } else {
            navigate('/takequiz');  // Redirect to takequiz route
          }
        }, 1500); // Redirect after success message shows for 1.5 seconds
      } else {
        // Handle case if the login is successful but with a non-200 status code
        setErrors({ ...errors, general: 'Unexpected error occurred' });
      }
    } catch (error: any) {
      console.error('Error occurred:', error);
  
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with an error code
          setErrors({
            ...errors,
            general: error.response.data.message || 'Unexpected error',
          });
        } else if (error.request) {
          // Request was made but no response received
          setErrors({ ...errors, general: 'No response from server' });
        } else {
          // Other errors (e.g., malformed request)
          setErrors({ ...errors, general: 'Unexpected error occurred' });
        }
      } else {
        setErrors({ ...errors, general: 'Unexpected error occurred' });
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <AuthLayout title="Sign in to your account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {/* Display any general API errors */}
        {errors.general && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        )}

        {/* Display success message */}
        {successMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        <div className="space-y-4">
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
            autoComplete="current-password"
            required
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <SubmitButton text="Sign in" icon={LogIn} isLoading={isLoading} />

        <div className="text-center">
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
