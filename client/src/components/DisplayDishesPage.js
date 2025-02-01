// client/src/components/DisplayDishesPage.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import './DisplayDishesPage.css';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

function DisplayDishesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to parse query parameters
  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      console.log(process.env.REACT_APP_API_URL);
      console.log(url);
      setError(null);

      const queryParams = getQueryParams();
      const ingredients = queryParams.get('ingredients');
      const mode = queryParams.get('mode') || 'inclusive';
      const match = queryParams.get('match') || 'some';
      const mealType = queryParams.get('mealType') || 'non-dessert';
      const numberOfDishes = queryParams.get('numberOfDishes') || 15;

      try {
        const backendURL = `${process.env.REACT_APP_API_URL}/search`;

        const params = {
          ingredients: ingredients,
          mode: mode,
          mealType: mealType,
          numberOfDishes: numberOfDishes,
        };

        if (mode === 'inclusive') {
          params.match = match;
        }

        const response = await axios.get(backendURL, { params });

        setRecipes(response.data.recipes);
       
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError(err.response?.data?.error || 'An error occurred while fetching recipes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [location.search]); // Re-fetch if URL changes

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <Navbar showBack={true} />
      <div className="dishes-page-container">
        {/* Back Button */}
      
        <h1 className="text-title">Recommended Dishes</h1>

        {loading && <p>Loading recipes...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && recipes.length === 0 && (
          <p>No recipes found based on your ingredients.</p>
        )}

        <div className="recipes-grid">
          {recipes.map(recipe => (
            <Link
              key={recipe.id}
              to={`/dish/${recipe.id}`}
              state={{ recipe }} // Pass the entire recipe object via state
              className="recipe-link" // Add a class for potential styling
            >
              <div className="recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-info">
                  <h2>{recipe.title}</h2>
                  <p>Health Score: {recipe.healthScore}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default DisplayDishesPage;
