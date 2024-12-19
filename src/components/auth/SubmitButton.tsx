import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SubmitButtonProps {
  text: string;
  icon?: LucideIcon;
  isLoading?: boolean;
}

export function SubmitButton({ text, icon: Icon, isLoading }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {Icon && (
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
        </span>
      )}
      {isLoading ? 'Loading...' : text}
    </button>
  );
}