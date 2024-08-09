import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <a href="#home" className="hover:text-blue-300">Book Store</a>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#home" className="hover:text-blue-300">Home</a>
          <a href="#books" className="hover:text-blue-300">Books</a>
          <a href="#about" className="hover:text-blue-300">About</a>
          <a href="#contact" className="hover:text-blue-300">Contact</a>
        </div>
        <button onClick={toggleMenu} className="md:hidden">
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-blue-600 text-white p-4">
          <a href="#home" className="block py-2 hover:text-blue-300">Home</a>
          <a href="#books" className="block py-2 hover:text-blue-300">Books</a>
          <a href="#about" className="block py-2 hover:text-blue-300">About</a>
          <a href="#contact" className="block py-2 hover:text-blue-300">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
