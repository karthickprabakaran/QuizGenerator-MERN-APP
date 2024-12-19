import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  name: string;
}

interface AuthError {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

export function useAuth() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthError>({});

  const validateCredentials = (credentials: LoginCredentials | SignupCredentials): boolean => {
    const newErrors: AuthError = {};

    if ('name' in credentials && !credentials.name) {
      newErrors.name = 'Name is required';
    }

    if (!credentials.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (credentials: LoginCredentials) => {
    if (!validateCredentials(credentials)) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login({
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
      });
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Failed to login. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (credentials: SignupCredentials) => {
    if (!validateCredentials(credentials)) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login({
        id: crypto.randomUUID(),
        email: credentials.email,
        name: credentials.name,
      });
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Failed to create account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    handleSignup,
    isLoading,
    errors,
  };
}