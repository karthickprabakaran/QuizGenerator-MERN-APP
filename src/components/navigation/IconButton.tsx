import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export function IconButton({ icon: Icon, onClick, className = '', label }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-gray-600 hover:text-indigo-600 ${className}`}
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}