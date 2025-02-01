// client/src/components/HomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/IngredientFiltering');
  };

  return (
    <>
      {/* Include Navbar without the back button */}
      <Navbar showBack={false} />
      <div className="home-container" style={{ paddingTop: '80px' }}>
        <div className="home-content-container">
          <div className="home-image">
            <img src="/tomato-icon.png" alt="Cooking Inspiration" />
          </div>
          <div className="home-content">
            <h1>Welcome to Fridge2Table</h1>
            <p>
              Discover new dishes and get personalized recipe recommendations based on the ingredients you have.
              Turn your kitchen into a creative culinary space!
            </p>
            <button onClick={handleGetStarted} className="get-started-button">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
