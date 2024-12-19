import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  to: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ to, icon: Icon, children, className = '' }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`flex items-center px-2 py-2 text-gray-900 hover:text-indigo-600 ${className}`}
    >
      {Icon && <Icon className="h-5 w-5 mr-2" />}
      {children}
    </Link>
  );
}