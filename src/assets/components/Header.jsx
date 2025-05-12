import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto">
      <div className="py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21L17 3M12 12H19M5 12H10" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-100">css2rtl</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link 
            to="/" 
            className="px-3 py-1 rounded transition hover:bg-slate-700 text-gray-200 hover:text-white"
          >
            Tool
          </Link>
          <Link 
            to="/documentation" 
            className="px-3 py-1 rounded transition hover:bg-slate-700 text-gray-200 hover:text-white"
            rel="noopener noreferrer"
          >
            Documentation
          </Link>
          <Link 
            to="/examples" 
            className="px-3 py-1 rounded transition hover:bg-slate-700 text-gray-200 hover:text-white"
            rel="noopener noreferrer"
          >
            Examples
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-slate-700 pb-4 px-6">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="px-3 py-2 rounded transition hover:bg-slate-600 text-gray-200 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Tool
            </Link>
            <Link 
              to="/documentation" 
              className="px-3 py-2 rounded transition hover:bg-slate-600 text-gray-200 hover:text-white"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link 
              to="/examples" 
              className="px-3 py-2 rounded transition hover:bg-slate-600 text-gray-200 hover:text-white"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Examples
            </Link>
          </nav>
        </div>
      )}
    </div>
    </header>
  );
}