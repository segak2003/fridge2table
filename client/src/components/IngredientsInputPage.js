// frontend/src/components/IngredientsInputPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './IngredientsInputPage.css';

function IngredientsInputPage() {
  const [ingredients, setIngredients] = useState('');
  const [mode, setMode] = useState('inclusive');
  const [match, setMatch] = useState('some'); // 'all' or 'some' (applicable in inclusive mode)
  const [mealType, setMealType] = useState('non-dessert');
  const [numberOfDishes, setNumberOfDishes] = useState(15);

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

  return (
    <>
      <Navbar showBack={true} />
      <div className="input-page-container">
        <button onClick={handleHome} className="home-button" aria-label="Go to Home Page">
          Home
        </button>

        <h1>Find Your Next Recipe</h1>
        <p>
          Enter the ingredients you have, and we'll inspire you with delicious dishes you can cook!
        </p>
        <form onSubmit={handleSubmit} className="input-form">
          <label htmlFor="ingredients">Ingredients (comma-separated):</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, rice, broccoli"
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
            <span>Search Mode:</span>
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
          </div>

          {mode === 'inclusive' && (
            <div className="match-selection">
              <span>Match Type:</span>
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
    </>
  );
}

export default IngredientsInputPage;
