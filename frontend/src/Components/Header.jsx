import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-semibold tracking-wide">My Website</h1>
        <nav>
          <ul className="flex space-x-8">
            <li><a href="#" className="text-white text-lg hover:text-gray-200 transition duration-300">Home</a></li>
            <li><a href="#" className="text-white text-lg hover:text-gray-200 transition duration-300">About</a></li>
            <li><a href="#" className="text-white text-lg hover:text-gray-200 transition duration-300">Services</a></li>
            <li><a href="#" className="text-white text-lg hover:text-gray-200 transition duration-300">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
