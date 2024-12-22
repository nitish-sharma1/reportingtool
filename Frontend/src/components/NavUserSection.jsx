import React, { useState, useRef, useEffect } from 'react';
import avatar from '../assets/avatar.png';
import { MdNotificationsActive } from "react-icons/md";

function NavUserSection() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logged out"); // Replace with actual logout logic
    closeDropdown();
  };

  const handleProfile = () => {
    console.log("Go to profile"); // Replace with actual navigation logic
    closeDropdown();
  };

  return (
    <div className="relative flex items-center">
      <MdNotificationsActive size={20} />
      <img
        src={avatar}
        alt="User Avatar"
        className="mx-10 cursor-pointer"
        onClick={toggleDropdown}
      />
      
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-32 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <button
            onClick={handleProfile}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default NavUserSection;
