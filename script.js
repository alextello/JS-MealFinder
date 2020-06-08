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

// Listeners

submit.addEventListener('submit', searchMeal)