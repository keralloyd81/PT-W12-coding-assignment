
const API_URL = 'http://localhost:3000/recipes';

const recipeForm = document.getElementById('recipeForm');
const nameInput = document.getElementById('recipeName');
const ingredientsInput = document.getElementById('recipeIngredients');
const instructionsInput = document.getElementById('recipeInstructions');
const recipeList = document.getElementById('recipeList');

// Load recipes
async function fetchRecipes() {
  const res = await fetch(API_URL);
  const recipes = await res.json();

  recipeList.innerHTML = '';
  recipes.forEach(recipe => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
  <h5>${recipe.name}</h5>
  <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
  ${recipe.instructions ? `<p><strong>Instructions:</strong> ${recipe.instructions}</p>` : ''}
  <button class="btn btn-sm btn-danger" onclick="deleteRecipe('${recipe.id}')">Delete</button>
`;
    recipeList.appendChild(li);
  });
}

// Add a recipe
recipeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const ingredients = ingredientsInput.value.trim();
  const instructions = instructionsInput.value.trim();

  if (!name || !ingredients) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, ingredients, instructions })
  });

  nameInput.value = '';
  ingredientsInput.value = '';
  instructionsInput.value = '';
  fetchRecipes();
});

// Delete a recipe
async function deleteRecipe(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  fetchRecipes();
}

// Init
fetchRecipes();
