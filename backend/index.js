// backend/index.js

const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();

dotenv.config();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors({
    origin: process.env.REACT_APP_URL,
    methods: ['GET', 'POST'],
    credentials: true
}));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

/**
 * GET /search
 * Query Parameters:
 * - ingredients: comma-separated list of ingredients (e.g., "tomato,cheese,basil")
 * - mode: "inclusive" or "exclusive"
 * - match: "all" for inclusive mode requiring all ingredients, "some" for allowing some missing
 * - mealType: "non-dessert" or "dessert"
 * - numberOfDishes: number of dishes to retrieve (e.g., 15)
 */
app.get('/search', async (req, res) => {
    try 
    {
        /*
         * - Exclusive Mode: When users want to limit the amount of missing ingredients in the recipes.
         * - Inclusive Mode: When users are open to buying additional ingredients.
         * - Match =  All: When users want recipes that use all of their provided ingredients.
         * - Match = Some: When users are okay with recipes that use some of their ingredients, allowing for more variety.
         */
        const { ingredients, match, mode = 'inclusive', mealType, numberOfDishes } = req.query;

        if (!ingredients)
        {
            return res.status(400).json({ error: "Missing ingredients parameter" });
        }

        const ingredientList = ingredients.split(',').map(ing => ing.trim().toLowerCase());

        if (ingredientList.length < 1)
        {
            return res.status(400).json({ error: "No valid ingredients provided" });
        }

        const ingredientsParam = ingredientList.join(',');
        const api_endpoint = 'https://api.spoonacular.com/recipes/complexSearch';

        let spoonacularParams = {
            apiKey: process.env.API_KEY,
            includeIngredients: ingredientsParam,
            ignorePantry: true,
            number: numberOfDishes || 15, // Default to 15 if not provided
            addRecipeInformation: true,
        };
        
        spoonacularParams.fillIngredients = true;

        if (mealType === "non-dessert")
        {
            spoonacularParams.type = "main course,side dish,appetizer,salad,soup,breakfast,lunch,dinner";
        }
        else
        {
            spoonacularParams.type = "dessert,snack";
        }

        // Configure parameters based on mode
        if (mode === 'inclusive') { 
            spoonacularParams.sort = "max-used-ingredients";
            spoonacularParams.ranking = 1;
        }
        else 
        {
            spoonacularParams.sort = "min-missing-ingredients";
            spoonacularParams.ranking = 2;
        }
        
        console.log(spoonacularParams);
        const response = await axios.get(api_endpoint, {
            params: spoonacularParams,
        });
        
        let recipes = response.data.results;
        console.log("num retrieved recipes: ", recipes.length);

        res.json({
            count: recipes.length,
            recipes,
        });
    }
    catch (error) 
    {
        console.error('Error fetching recipes:', error.message);

        if (error.response) {
            return res.status(error.response.status).json({
              error: error.response.data.message || 'Error from Spoonacular API.',
            });
          }
      
          // Generic server error
          res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});
