import { useState } from 'react';
import { Link, useMatchRoute } from '@tanstack/react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const matchRoute = useMatchRoute();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Users', path: '/users' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Courses', path: '/courses' },
    { name: 'Events', path: '/events' },
  ];

  const authItems = [
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'Logout', path: '/logout' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="bg-orange-500 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            {/* Logo */}
            <div>
              <a href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">Logo</span>
              </a>
            </div>
            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`py-4 px-2 text-white border-b-4 ${matchRoute({ to: item.path }) ? 'border-yellow-400' : 'border-orange-500'}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Secondary Nav */}
          <div className="hidden md:flex items-center space-x-3">
            {authItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="py-2 px-2 font-semibold text-white rounded hover:bg-yellow-400 hover:text-gray-800 transition duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-orange-500`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${matchRoute({ to: item.path }) ? 'text-white bg-yellow-400' : 'text-white hover:text-white hover:bg-yellow-400'}`}
            >
              {item.name}
            </Link>
          ))}
          {authItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-yellow-400"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
