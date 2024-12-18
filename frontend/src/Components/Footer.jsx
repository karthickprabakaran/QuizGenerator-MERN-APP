import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-lg font-medium">© 2024 My Website. All Rights Reserved.</p>
        <div className="mt-4">
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-gray-400 transition duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-400 transition duration-300">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gray-400 transition duration-300">Contact</a></li>
          </ul>
        </div>
        <div className="mt-4 flex space-x-6">
          <a href="#" className="text-white hover:text-gray-400 transition duration-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition duration-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition duration-300">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition duration-300">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
