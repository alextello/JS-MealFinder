const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    singleMealEl = document.getElementById('single-meal');


// Buscar comida y fetch
function searchMeal(e) {
    e.preventDefault();

    // Limpliar única comida
    singleMealEl.innerHTML = '';

    // obtener término de búsqueda
    const term = search.value;

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2>Resultados de búsqueda para '${term}':</h2>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = '<p>No hay resultados. Intente de nuevo.</p>'
                } else {
                    mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `).join('');
                }
            });
        // Limpiar búsqueda
        search.value = '';
    } else {
        alert('Ingrese un término de búsqueda');
    }
}

// obtener comida por ID

function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}

function addMealToDOM(meal) {
    const ingredientes = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredientes.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    singleMealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
            <div class="main">
            <p>${meal.strInstructions}</p>
                <p>${meal.strInstructions}</p>
                <h2>Ingredientes</h2>
                <ul>
                ${ingredientes.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
    </div>`;
}

// Listeners

submit.addEventListener('submit', searchMeal)

mealsEl.addEventListener('click', e => {
    const path = e.path || (e.composedPath && e.composedPath());
    const mealInfo = path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
});