//Elementos HTML
let triviaForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionsContent");
let questionTitle = document.getElementById("questionName");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");


//Variables de control
let questions;
let qIndex = 0;
let answersArray = [];

//Funciones
let getAPIData = e => {
    e.preventDefault();
    let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            questions = data.results;
            startGame();
        })
}

const startGame = () => {
    console.log(questions);
    questionsContainer.style.display = "flex"
    triviaForm.style.display = "none"

    //Variable para controlar preguntas una por una
    let currentQuestion = questions[qIndex];
    console.log(currentQuestion.question);
    questionTitle.innerText = currentQuestion.question;
    qIndex += 1

    //Variable para controlar respuestas una por una
    let typeQuestion = currentQuestion.type

    if(typeQuestion === "boolean"){
        document.getElementById("1").innerText = "True";
        document.getElementById("2").innerText = "False";
        document.getElementById("3").style.display = "none";
        document.getElementById("4").style.display = "none";
    }else{
        document.getElementById("1").style.display = "block";
        document.getElementById("2").style.display = "block";
        document.getElementById("3").style.display = "block";
        document.getElementById("4").style.display = "block";

        let incorrectAnswers = currentQuestion.incorrect_answers
        let correctAnswers = currentQuestion.correct_answer
        answersArray = incorrectAnswers.concat(correctAnswers)
        answersArray.forEach(answer => {

        })
        console.log(answersArray)
    }
    
}

//Listener
triviaForm.addEventListener("submit", getAPIData)