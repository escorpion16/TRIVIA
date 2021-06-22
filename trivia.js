//Elementos HTML
let triviaForm = document.getElementById("trivia");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");

//Funciones
let getAPIData = e => {
    e.preventDefault()
    let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const questions = data.results;
            console.log(data)
        })
}

//Listener
triviaForm.addEventListener("submit", getAPIData)