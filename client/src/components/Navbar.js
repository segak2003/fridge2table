// client/src/components/Navbar.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaintBrush, FaArrowLeft } from 'react-icons/fa';
import { VscArrowLeft } from "react-icons/vsc";
import './Navbar.css';

const Navbar = ({ showBack }) => {
  const navigate = useNavigate();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const handleThemeClick = () => {
    setIsThemeModalOpen(true);
  };

  const closeThemeModal = () => {
    setIsThemeModalOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Left Section */}
        <div className="navbar-section navbar-left">
          {showBack ? (
            <button
            className="theme-btn"
            onClick={() => navigate(-1)}
            aria-label="Select Theme"
          >
            <VscArrowLeft />
          </button>
          ) : (
            <img src="/tomato-icon.png" alt="Logo" className="navbar-logo" />
          )}
        </div>
        
        {/* Center Section */}
        <div className="navbar-section navbar-center" onClick={() => navigate('/')}>
          <h1 className='home-label'>Fridge2Table</h1>
        </div>
        
        {/* Right Section */}
        <div className="navbar-section navbar-right">
          <button
            className="theme-btn"
            onClick={handleThemeClick}
            aria-label="Select Theme"
          >
            <FaPaintBrush />
          </button>
        </div>
      </nav>
      
      {isThemeModalOpen && (
        <div className="theme-modal-overlay active" onClick={closeThemeModal}>
          <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Select a Theme</h2>
            <ul className="theme-list">
              <li
                onClick={() => {
                  document.documentElement.setAttribute('data-theme', 'blue');
                  closeThemeModal();
                }}
              >
                Blue
              </li>
              <li
                onClick={() => {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  closeThemeModal();
                }}
              >
                Dark
              </li>
              <li
                onClick={() => {
                  document.documentElement.setAttribute('data-theme', 'red-orange');
                  closeThemeModal();
                }}
              >
                Red-Orange
              </li>
              <li
                onClick={() => {
                  document.documentElement.setAttribute('data-theme', 'blue-purple');
                  closeThemeModal();
                }}
              >
                blue-purple
              </li>
              <li
                onClick={() => {
                  document.documentElement.setAttribute('data-theme', 'purple-pink');
                  closeThemeModal();
                }}
              >
                Purple-Pink
              </li>
              <li
                onClick={() => {
                  document.documentElement.setAttribute('data-theme', 'sunset');
                  closeThemeModal();
                }}
              >
                Sunset
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
