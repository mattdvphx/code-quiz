const timerEl = document.getElementById("time");

const startScreen = document.getElementById("start-screen");

const quizScreen = document.getElementById("quiz-screen");

const scoreScreen = document.getElementById("score-screen");

const scoreLabel = document.getElementById("score-label")

const highscoreBtn = document.getElementById("highscore-btn")

const leaderboardEl = document.getElementById("leaderboard")

const scoreEl = document.getElementById("scores")

const codeBtn = document.getElementById("code-btn")

const startBtn = document.getElementById("start-btn");

const form = document.getElementById("form")

const submitBtn = document.getElementById("submit-btn")

const aButton = document.getElementById("a");

const bButton = document.getElementById("b");
const questionEl = document.getElementById("question-el");
const answerAel = document.getElementById("answerA-el");
const answerBel = document.getElementById("answerB-el");
//questions array
const answerButtons = document.getElementsByClassName("ansr-btns");
var time = 20;
var questionIndex = 0;

var questions = [
    {
        question: "What is JavaScript?",
        answerA: "A. A software",
        answerB: "B. A Programming language",
        correct: "B. A Programming language"
    },
    {
        question: "Is JAVA the same as JavaScript?",
        answerA: "A. NO",
        answerB: "B. YES",
        correct: "A. NO"
    },
    {
        question: "Can JavaScript add functions to a Website?",
        answerA: "A. YES",
        answerB: "B. NO",
        correct: "A. YES"
    }
    
];

startBtn.addEventListener("click", function () {
    startScreen.classList.add("hide");
    quizScreen.classList.toggle("hide");
    startTime();
    showQuestion();
});

highscoreBtn.addEventListener("click", function () {
    if (quizScreen.className !== "hide") {
        alert("time up")
    }

    else if (leaderboardEl.className !== "hide") {
        leaderboardEl.classList.toggle("hide")
        startScreen.classList.toggle("hide")
    }

    else {
        startScreen.classList.add("hide")
        let checkedSCore = JSON.parse(localStorage.getItem("Scores"))
        if (checkedSCore === null) {
            scoreEl.innerHTML = "your score!"
        }
        else {
            addScore();
        }
        leaderboardEl.classList.toggle("hide")
    }
})

function startTime() {
    let timer = setInterval(() => {
        timerEl.innerHTML = "Time: " + time + "s";
        if (time <= 0 || questionIndex > questions.length - 1) {
            endGame();
            clearInterval(timer)
            return time
        }
        time--;
    }, 1000);
};

function showQuestion() {
    if (questionIndex > questions.length) {
        endGame();
    }
    if (questionIndex <= questions.length - 1) {
        questionEl.innerHTML = questions[questionIndex].question

        answerAel.innerHTML = questions[questionIndex].answerA
        answerBel.innerHTML = questions[questionIndex].answerB
        
        aButton.setAttribute("data-value", questions[questionIndex].answerA)
        bButton.setAttribute("data-value", questions[questionIndex].answerB)
        
    }
}

// events
for (let index = 0; index < answerButtons.length; index++) {
    answerButtons[index].addEventListener('click', function (event) {
        checkAnswer(event);
    })
}

// events click
function checkAnswer(event) {
    if (event.target.dataset.value === questions[questionIndex].correct) {
        console.log("correct")
        event.target.classList.toggle("correct")
    }
    else {
        event.target.classList.toggle("wrong")
        time -= 5;
    }
    for (let index = 0; index < answerButtons.length; index++) {
        answerButtons[index].disabled = true
    }
    setTimeout(function () {
        resetButtons();
        questionIndex++;
        showQuestion();
    }, 500)
}

function endGame() {
    quizScreen.classList.toggle("hide")
    scoreScreen.classList.toggle("hide")
    if (time < 5) {
        scoreLabel.innerHTML = "Score: " + time + "s"
    }
    else {
        scoreLabel.innerHTML = "Score: " + time + "s"
    }
}

function resetButtons() {
    for (let index = 0; index < answerButtons.length; index++) {
        answerButtons[index].disabled = false
        answerButtons[index].classList.remove("correct")
        answerButtons[index].classList.remove("wrong")
        answerButtons[index].classList.add("nuetral")
    }
}

submitBtn.addEventListener("click", function checkScore(event) {
    event.preventDefault();
    var initials = document.getElementById("initials").value
    var checkedScore = JSON.parse(localStorage.getItem("Scores"))
    if (checkedScore === null) {
        var scores = []
        var playerScore = {}
        playerScore.name = initials
        playerScore.score = time
        scores.push(playerScore)
        localStorage.setItem("Scores", JSON.stringify(scores))
    }
    else {
        var scores = []
        var playerScore = {}
        playerScore.name = initials
        playerScore.score = time
        console.log(checkedScore)
        checkedScore.push(playerScore)
        localStorage.setItem("Scores", JSON.stringify(checkedScore))
    }
    form.reset();
    addScore();
    leaderboardEl.classList.toggle("hide")
})

function addScore() {
    let leaderboard = JSON.parse(localStorage.getItem("Scores"))
    console.log(leaderboard)
    for (let index = 0; index < leaderboard.length; index++) {
        var pScore = document.createElement("p")

        pScore.classList.add("score")

        pScore.innerHTML = leaderboard[index].name + ": " + leaderboard[index].score

        var scoreRow = document.createElement("div")

        var scoreCol = document.createElement("div")

        scoreRow.classList.add("row")

        scoreCol.classList.add("col-12")

        scoreEl.prepend(scoreRow)

        scoreRow.appendChild(scoreCol)

        scoreCol.appendChild(pScore)
    }
}