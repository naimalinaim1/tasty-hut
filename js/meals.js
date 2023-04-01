// load meals
const loadMeals = async (searchMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals);
  } catch (error) {
    console.log(error);
  }
};

// display meals
const displayMeals = (meals) => {
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = "";
  try {
    meals.forEach((meal) => {
      const {
        idMeal: id,
        strMeal: name,
        strInstructions: des,
        strMealThumb: img,
      } = meal;
      const description = des.slice(0, 80);
      const div = document.createElement("div");
      const makeClass = "card card-side bg-base-100 border h-[280px]";
      div.className = makeClass;
      div.innerHTML = `
            <figure>
                <img class="w-[550px] h-[280px] " src="${img}" alt=""/>
            </figure>
            <div class="card-body">
                <h2 class="card-title font-bold mt-6 mb-2 text-2xl">${name}</h2>
                <p class="text-gray-500 mb-1 text-xl">${description} ...</p>
                <label for="mealDetails" onclick="mealDetails('${id}');"><a class="cursor-pointer text-warning underline text-xl">View Details</a></label>
            </div>
            `;
      mealsContainer.appendChild(div);
    });
  } catch (error) {
    console.log(error.message);
    document.getElementById("meal-not-found").style.display = "block";
  }
};
// search meals
const searchMeal = (clicked) => {
  const searchMeal = document.getElementById("search-meal").value;
  loadMeals(searchMeal);
  setTimeout(() => {
    window.location.href = "#meals-section";
  }, 1000);
};

// Meal details
const mealDetails = async (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetails(data.meals[0]);
};

const displayMealDetails = (meal) => {
  const {
    strMeal: name,
    strMealThumb: img,
    strCategory: category,
    strArea: area,
    strInstructions: instruction,
    strYoutube: youtubeLink,
  } = meal;
  document.getElementById("meal-name").innerText = name;
  document.getElementById("meal-image").src = img;
  document.getElementById("meal-category").innerText = category;
  document.getElementById("meal-area").innerText = area;
  document.getElementById("meal-instruction").innerText = instruction;
  const link = document.getElementById("meal-link");
  link.href = youtubeLink;
  link.target = "_blank";
  link.innerText = youtubeLink;
  link.style.color = "blue";
};

loadMeals("chicken");
