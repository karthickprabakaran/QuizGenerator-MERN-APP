import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from './IconButton';
import { useAuthStore } from '../../store/authStore';

export function UserNav() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleProfile = () => navigate('/profile');
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <IconButton
        icon={User}
        onClick={handleProfile}
        label="View Profile"
        className="mr-4"
      />
      <IconButton
        icon={LogOut}
        onClick={handleLogout}
        label="Logout"
      />
    </>
  );
}