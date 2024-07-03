import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Home</Link>
        <div className="flex gap-4">
          <Link to="/3d-models" className="hover:text-gray-400">3D Models</Link>
          <Link to="/2d-models" className="hover:text-gray-400">2D Models</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
