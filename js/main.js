// Grab all necessary HTML elements
const imageElement = document.getElementById("image");
const inputElement = document.getElementById("input-text");
const buttonElement = document.getElementById("submit-button");
const rightCounterElement = document.querySelector(".right");
const wrongCounterElement = document.querySelector('.wrong');

// Counter elements
let rightCount = 0;
let wrongCount = 0;
let pokemon = null;

// Retrieve pokemon data from PokeAPI
async function getPokemon() {
    // API Url
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/"
    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 1000);

    try {
        const response = await fetch(`${apiUrl}${randomNumber}`);
        const apiPokemon = await response.json();
        pokemon = {
            name: apiPokemon.species.name,
            img: apiPokemon.sprites.front_default
        };
        console.log(pokemon);
        start();
    } catch (error) {
        alert("Error caught", error);
    }
}

// Change the image
function start() {
    imageElement.src = pokemon.img;
}

// This function will run when the user clicks on the submit button
function submit() {
    // When the user guesses correctly
    if (inputElement.value === pokemon.name) {
        alert("You are right!");
        rightCount++
        updateCount();
        getPokemon();
    } else { // When the user guesses wrong
        alert("You are wrong!");
        wrongCount++
        updateCount();
        getPokemon();
    }
}

// Update the right and wrong counter
function updateCount() {
    rightCounterElement.textContent = rightCount;
    wrongCounterElement.textContent = wrongCount;
}

// Review the user's input answer 
buttonElement.addEventListener('click', submit);

// call the API
getPokemon();