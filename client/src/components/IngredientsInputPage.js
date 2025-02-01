// frontend/src/components/IngredientsInputPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa'; // import the question icon
import Navbar from './Navbar';
import './IngredientsInputPage.css';

function IngredientsInputPage() {
  const [ingredients, setIngredients] = useState('');
  const [mode, setMode] = useState('inclusive');
  const [match, setMatch] = useState('some'); // 'all' or 'some' (applicable in inclusive mode)
  const [mealType, setMealType] = useState('non-dessert');
  const [numberOfDishes, setNumberOfDishes] = useState(15);

  // New states for info modals
  const [showModeInfo, setShowModeInfo] = useState(false);
  const [showMatchInfo, setShowMatchInfo] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ingredients.trim()) {
      alert('Please enter at least one ingredient.');
      return;
    }

    if (numberOfDishes < 1 || numberOfDishes > 100) {
      alert('Please enter a number between 1 and 100 for the number of dishes.');
      return;
    }

    // Construct query parameters
    const queryParams = new URLSearchParams({
      ingredients: ingredients,
      mode: mode,
      match: mode === 'inclusive' ? match : undefined,
      mealType: mealType,
      numberOfDishes: numberOfDishes,
    });

    navigate(`/dishes?${queryParams.toString()}`);
  };

  const handleHome = () => {
    navigate('/');
  };

  // Simple modal component rendered inline
  const InfoModal = ({ title, message, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="submit-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar showBack={true} />
      <div className="input-page-container">
        <button onClick={handleHome} className="home-button" aria-label="Go to Home Page">
          Home
        </button>

        <h1 className='text-title'>Find Your Next Recipe</h1>
        <p>
          Enter the ingredients you have, and we'll inspire you with delicious dishes you can cook!
        </p>
        <form onSubmit={handleSubmit} className="input-form">
          <label htmlFor="ingredients">
            Ingredients (comma-separated without spaces):
          </label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. chicken, rice, broccoli"
          />

          <label htmlFor="numberOfDishes">Number of Dishes:</label>
          <input
            type="number"
            id="numberOfDishes"
            value={numberOfDishes}
            onChange={(e) => setNumberOfDishes(e.target.value)}
            min="1"
            max="100"
            placeholder="Enter number of dishes (e.g., 15)"
          />

          <div className="mode-selection">
            <span>
              Search Mode:
            </span>
            <label>
              <input
                type="radio"
                name="mode"
                value="inclusive"
                checked={mode === 'inclusive'}
                onChange={() => setMode('inclusive')}
              />
              Inclusive
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="exclusive"
                checked={mode === 'exclusive'}
                onChange={() => setMode('exclusive')}
              />
              Exclusive
            </label>
            {/* Question mark icon to show explanation for mode */}
            <FaQuestionCircle 
              className="info-icon" 
              onClick={() => setShowModeInfo(true)} 
              title="Click for explanation" 
            />
          </div>

          {mode === 'inclusive' && (
            <div className="match-selection">
              <span>
                Match Type:
              </span>
              <label>
                <input
                  type="radio"
                  name="match"
                  value="all"
                  checked={match === 'all'}
                  onChange={() => setMatch('all')}
                />
                Match All Ingredients
              </label>
              <label>
                <input
                  type="radio"
                  name="match"
                  value="some"
                  checked={match === 'some'}
                  onChange={() => setMatch('some')}
                />
                Match Some Ingredients
              </label>
              {/* Question mark icon to show explanation for match type */}
              <FaQuestionCircle 
                  className="info-icon" 
                  onClick={() => setShowMatchInfo(true)} 
                  title="Click for explanation" 
                />
            </div>
          )}

          <div className="meal-type-selection">
            <span>Meal Type:</span>
            <label>
              <input
                type="radio"
                name="mealType"
                value="non-dessert"
                checked={mealType === 'non-dessert'}
                onChange={() => setMealType('non-dessert')}
              />
              Non-Dessert
            </label>
            <label>
              <input
                type="radio"
                name="mealType"
                value="dessert"
                checked={mealType === 'dessert'}
                onChange={() => setMealType('dessert')}
              />
              Dessert
            </label>
          </div>

          <button type="submit" className="submit-button">
            Search Recipes
          </button>
        </form>
      </div>

      {/* Render the modals conditionally */}
      {showModeInfo && (
        <InfoModal
          title="Search Mode Explanation"
          message={
            <>
              <strong>Inclusive:</strong> Recipes may use the ingredients you have, but might require extra items.<br /><br />
              <strong>Exclusive:</strong> Recipes will limit showing recipes you are missing ingredients for.
            </>
          }
          onClose={() => setShowModeInfo(false)}
        />
      )}

      {showMatchInfo && (
        <InfoModal
          title="Match Type Explanation"
          message={
            <>
              <strong>Match All Ingredients:</strong> Recipes must contain all the ingredients you provided.<br /><br />
              <strong>Match Some Ingredients:</strong> Recipes only need to contain some of your ingredients.
            </>
          }
          onClose={() => setShowMatchInfo(false)}
        />
      )}
    </>
  );
}

export default IngredientsInputPage;
