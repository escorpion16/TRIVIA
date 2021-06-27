//Elementos HTML
let triviaForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionsContent");
let questionTitle = document.getElementById("questionName");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");

let questionIndex = document.getElementById("question_index");
let numQuestions = document.getElementById("num_questions"); 

let answers = document.getElementsByClassName("answers");
//Variables de control
let questions;
let qIndex = 0;
let correct_index_answer;
let score = 0;
let scoreAccumulator = 0;
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
    console.log("el score es: " + score)
    questionsContainer.style.display = "flex"
    triviaForm.style.display = "none"

    //Variable para controlar preguntas una por una
    let currentQuestion = questions[qIndex];
    questionTitle.innerText = currentQuestion.question;

    //Variable para controlar respuestas una por una
    let typeQuestion = currentQuestion.type

    if(typeQuestion === "boolean"){
        document.getElementById("1").innerText = "True";
        document.getElementById("2").innerText = "False";
        document.getElementById("3").style.display = "none";
        document.getElementById("4").style.display = "none";

        if(currentQuestion.correct_answer === 'True') correct_index_answer = 1 ;
        else correct_index_answer = 2;
    }else{
        document.getElementById("1").style.display = "block";
        document.getElementById("2").style.display = "block";
        document.getElementById("3").style.display = "block";
        document.getElementById("4").style.display = "block";

        correct_index_answer = Math.floor(Math.random() * 4) + 1 
        document.getElementById(correct_index_answer).innerText = currentQuestion.correct_answer;
        let j = 0;

        for(let i = 1; i <= 4; i++){
            if(i === correct_index_answer) continue
            document.getElementById(i).innerText = currentQuestion.incorrect_answers[j];
            j++;
        }
    }

    questionIndex.innerText = qIndex + 1;
    numQuestions.innerText = amount.value;    
}


const selectAnswer = id => {
    let answerId = id;
    if(answerId == correct_index_answer){
        console.log("respuesta correcta!")
        score = 1;
    }else {
        console.log("resp incorecta")
    }
    
    if(qIndex < (amount.value - 1)){
        startGame(); 
        qIndex++;
        questionIndex.innerText = qIndex + 1;   
    }else if (qIndex == (amount.value - 1)){
        qIndex++;
        questionIndex.innerText = qIndex + 1;
        showResults();
    }  

    scoreAccumulator = scoreAccumulator + score;
}

const showResults = () => {
    questionsContainer.innerText = "";
    let containerResults = document.createElement("div");
    containerResults.className = "container-results";

    let score = document.createElement("p");
    score.innerText = `Juego terminado!`;
    
    let currrentScore = document.createElement("div");
    currrentScore.innerText = `SCORE: ${scoreAccumulator}/${amount.value}`;

    let restartBtn = document.createElement("a");
    restartBtn.innerText = "Jugar otra vez..."
    restartBtn.className = "refreshBtn"
    restartBtn.setAttribute("href","index.html");

    containerResults.append(score);
    containerResults.append(currrentScore)
    containerResults.append(restartBtn);

    questionsContainer.appendChild(containerResults);
}   

// FOR que recorra todos los botones
for (let i=0; i < answers.length; i++){
    const element = answers[i];
    element.addEventListener("click", () => {
        selectAnswer(element.id)
    })
}
//Listener
triviaForm.addEventListener("submit", getAPIData)