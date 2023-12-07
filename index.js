//adds users activities 
const form1 = document.querySelector('#activityForm')
form1.addEventListener('submit', (event) => {
    event.preventDefault()
    logActivity(event.target.activities.value)

    form1.reset()
});

const logActivity = (activity) => {
    let li = document.createElement('li')
    li.textContent = activity
    document.querySelector('#activitySubmit').appendChild(li)
    li.addEventListener('click', event => event.target.remove())
}

//adds users equipment 
const form2 = document.querySelector('#equipmentForm')
form2.addEventListener('submit', (event) => {
    event.preventDefault()
    logEquipment(event.target.equipment.value)
    form2.reset()
});

const logEquipment = (equipment1) => {
    let li = document.createElement('li')
    li.textContent = equipment1
    document.querySelector('#equipmentSubmit').appendChild(li)
    li.addEventListener('click', event => event.target.remove())
}

document.addEventListener('DOMContentLoaded', () => {
    const foodSearchBtn = document.querySelector('#findFood');
    const loadingMsg = document.querySelector('#loadingMsg');

    foodSearchBtn.addEventListener('click', (event) => {
        loadingMsg.style.display = 'block';
        searchFood();
    });

    async function getFood() {
        try {
            const searchTerm = document.getElementById('searchInput').value;
            const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page_size=10&json=true`;
            const response = await fetch(url);
            const result = await response.json();
            displayFoodResults(result);
            loadingMsg.style.display = 'none'
        } catch (error) {
            console.error(error);
        }
    }

    function searchFood() {
        const foodList = document.getElementById('foodList');
        foodList.textContent = '';
        getFood();
    }

    function displayFoodResults(result) {
        const foodList = document.getElementById('foodList');

        if (!result.products || result.products.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No results found';
            foodList.appendChild(li);
            return;
        }

        result.products.slice(0, 3).forEach(product => {
            const li = createFoodListItem(product);
            foodList.appendChild(li);
        });
    }

    function createFoodListItem(product) {
        const li = document.createElement('li');
        const foodLabel = document.createElement('h4');
        const foodImage = document.createElement('img');
        const nutrients = document.createElement('span');

        foodLabel.textContent = product.product_name;
        foodImage.src = product.image_url;

        const formattedNutrients = formatNutrients(product.nutriments);
        nutrients.textContent = formattedNutrients;

        li.append(foodLabel, foodImage, nutrients);
        foodImage.style.display = 'block';
        foodImage.style.width = '10%';
        foodImage.style.height = '15%';

        return li;
    }

    function formatNutrients(nutrientInfo) {
        return Object.entries(nutrientInfo)
            .filter(([key, value]) => value > 0)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
    }

    const sizeIncrease = (element) => {
        element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.2)'
    });
    };

    const sizeDecrease = (element) => {
        element.addEventListener('mouseout', () =>{
            element.style.transform = 'scale(1)'
        })
    }

    const nutrients = document.querySelector('.flag')
    sizeIncrease(nutrients);
    sizeDecrease(nutrients)

});




