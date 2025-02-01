// client/src/components/RecipeDetailPage.js

import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './RecipeDetailPage.css';

function RecipeDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const recipe = location.state?.recipe;

  // If no recipe data is passed, redirect back to Dishes page
  if (!recipe) {
    navigate('/Dishes');
    return null;
  }

  const {
    title,
    image,
    instructions,
    extendedIngredients,
    healthScore,
    summary,
    spoonacularSourceUrl,
    analyzedInstructions,
    readyInMinutes,
    servings,
    cuisines,
    diets,
    dishTypes,
    sourceUrl,
  } = recipe;

  return (
    <>
      <Navbar showBack={true} />
      <div className="detail-page-container">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="detail-back-button" aria-label="Go Back">
          ← Back
        </button>

        <h1 className="recipe-title">{title}</h1>
        <div className="detail-content">
          <img src={image} alt={title} className="detail-image" />
          <div className="detail-info">
            <div className="health-score">
              <strong>Health Score:</strong> {healthScore}
            </div>
            <div className="additional-info">
              <p><strong>Ready In:</strong> {readyInMinutes} minutes</p>
              <p><strong>Servings:</strong> {servings}</p>
              {cuisines.length > 0 && (
                <p><strong>Cuisines:</strong> {cuisines.join(', ')}</p>
              )}
              {diets.length > 0 && (
                <p><strong>Diets:</strong> {diets.join(', ')}</p>
              )}
              {dishTypes.length > 0 && (
                <p><strong>Dish Types:</strong> {dishTypes.join(', ')}</p>
              )}
            </div>
            <div className="ingredients">
              <h2>Ingredients</h2>
              <ul>
                {extendedIngredients.map(ingredient => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <h2>Instructions</h2>
              {instructions ? (
                <div dangerouslySetInnerHTML={{ __html: instructions }} />
              ) : (
                <p>No instructions available.</p>
              )}
            </div>
            <div className="summary">
              <h2>Summary</h2>
              {summary ? (
                <div dangerouslySetInnerHTML={{ __html: summary }} />
              ) : (
                <p>No summary available.</p>
              )}
            </div>
            <div className="analyzed-instructions">
              <h2>Detailed Steps</h2>
              {analyzedInstructions && analyzedInstructions.length > 0 ? (
                <ol>
                  {analyzedInstructions[0].steps.map(step => (
                    <li key={step.number}>{step.step}</li>
                  ))}
                </ol>
              ) : (
                <p>No detailed instructions available.</p>
              )}
            </div>
            <button
              onClick={() => window.open(spoonacularSourceUrl, '_blank')}
              className="detail-button"
            >
              View Full Recipe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetailPage;
