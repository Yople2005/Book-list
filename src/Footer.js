import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Book Store. All rights reserved.</p>
      <div className="mt-2">
        <a href="https://facebook.com" className="mr-4 hover:text-blue-300">Facebook</a>
        <a href="https://twitter.com" className="mr-4 hover:text-blue-300">Twitter</a>
        <a href="https://instagram.com" className="hover:text-blue-300">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
