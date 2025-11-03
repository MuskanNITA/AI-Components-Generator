import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiSun, HiMoon } from 'react-icons/hi';
import { RiSettings3Fill } from 'react-icons/ri';

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    // Load saved theme from localStorage
    return localStorage.getItem("theme") === "dark";
  });

  // Apply theme class to document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b border-gray-800 dark:border-gray-200 transition-colors duration-300">
      
      {/* Left Logo */}
      <div className="logo">
        <h3 className="text-[22px] font-[800] text-purple-500 dark:text-purple-600 tracking-wide">
          GenUI Code Studio
        </h3>
      </div>

      {/* Right Side Icons */}
      <div className="icons flex items-center gap-[15px] text-[22px] text-gray-300 dark:text-gray-800">
        
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-all"
        >
          {isDark ? <HiSun /> : <HiMoon />}
        </button>

        {/* User (contact placeholder) */}
        <button
          onClick={() => alert('Contact: 6201muskan@example.com')}
          className="p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-all"
        >
          <FaUser />
        </button>

        {/* Settings */}
        <button
          onClick={() => alert('Settings clicked! (Feature coming soon...)')}
          className="p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-all"
        >
          <RiSettings3Fill />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
