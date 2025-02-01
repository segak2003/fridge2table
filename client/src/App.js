// client/src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import DisplayDishesPage from './components/DisplayDishesPage';
import IngredientsInputPage from './components/IngredientsInputPage';
import RecipeDetailPage from './components/RecipeDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/Dishes',
    element: <DisplayDishesPage />,
  },
  {
    path: '/IngredientFiltering',
    element: <IngredientsInputPage />,
  },
  {
    path: '/dish/:id',
    element: <RecipeDetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
