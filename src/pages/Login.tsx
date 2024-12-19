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
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ general: '', email: '', password: '' });
    setSuccessMessage(''); // Reset success message on each attempt
  
    try {
      const response = await axios.post('http://localhost:5001/Profile', {
        email,
        password,
      });
  
      console.log('Response from server:', response.data); // Log the response data to check if the server sends the expected response
  
      if (response.status === 200) {
        // On success, set the success message
        setSuccessMessage('Login successful!');
        
        // Redirect to a dashboard or home page after successful login
        setTimeout(() => {
          navigate('/'); // Example redirection after login
        }, 1500); // Allow time to show success message before redirection
      }
    } catch (error: any) {
      console.error('Error occurred:', error);
  
      // Handle Axios error
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with an error code
          console.log('Error response from server:', error.response.data);
          setErrors({ ...errors, general: error.response.data.message || 'Unexpected error' });
        } else if (error.request) {
          // Request was made but no response was received
          setErrors({ ...errors, general: 'No response from server' });
        } else {
          // Something else went wrong
          setErrors({ ...errors, general: 'Unexpected error occurred' });
        }
      } else {
        setErrors({ ...errors, general: 'Unexpected error occurred' });
      }
    } finally {
      setIsLoading(false); // Turn off the loading spinner
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

        {/* Display the success message */}
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
        <SubmitButton text="Sign in" icon={LogIn} isLoading={isLoading}/>

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
