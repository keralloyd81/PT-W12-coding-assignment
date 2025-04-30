// Set the base URL for your fake API (json-server)
const API_URL = 'http://localhost:3000/recipes';

// Get references to elements from the HTML
const recipeForm = document.getElementById('recipeForm');
const nameInput = document.getElementById('recipeName');
const ingredientsInput = document.getElementById('recipeIngredients');
const instructionsInput = document.getElementById('recipeInstructions');
const recipeList = document.getElementById('recipeList');

// Load recipes and display them
async function fetchRecipes() {
  //Get recipes from server
  const res = await fetch(API_URL);
  const recipes = await res.json();

  // Clear the list before adding items again
recipeList.innerHTML = '';
  
// Loop through each recipe and create a list item
  recipes.forEach(recipe => {
    const li = document.createElement('li');
    li.className = 'list-group-item';

        // Insert the recipe data into the list item
    li.innerHTML = `
  <h5>${recipe.name}</h5>
  <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
  ${recipe.instructions ? `<p><strong>Instructions:</strong> ${recipe.instructions}</p>` : ''}
  <button class="btn btn-sm btn-danger" onclick="deleteRecipe('${recipe.id}')">Delete</button>
`;

    // Add the item to the recipe list in the DOM
    recipeList.appendChild(li);
  });
}

// Add a new recipe when the form is submitted
recipeForm.addEventListener('submit', async (e) => {
  e.preventDefault(); //Stops the page from refreshing

    // Get values from input fields
  const name = nameInput.value.trim();
  const ingredients = ingredientsInput.value.trim();
  const instructions = instructionsInput.value.trim();

    // Basic validation (don't submit if fields are empty)
  if (!name || !ingredients) return;

    // Send a POST request to add the new recipe
  await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, ingredients, instructions }) //Convert object to JSON
  });

  //Clear the form fields
  nameInput.value = '';
  ingredientsInput.value = '';
  instructionsInput.value = '';

  //Reload the updated recipe list
  fetchRecipes();
});

// Delete a recipe
async function deleteRecipe(id) {
  //Sends a delete request to remove a specified recipe by its ID
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  //Reload the recipe list to show the change
  fetchRecipes();
}

// Load all the recipes when the page first opens
fetchRecipes();
