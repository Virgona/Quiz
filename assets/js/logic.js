var timeLeft = questions.length * 15;
var currentQuestionIndex = 0;
var startBtn = document.querySelector('#start-btn');
var quizQuestions = document.querySelector('#questions');
var timer = document.querySelector('#time');
var answers = document.querySelector('#answers');
var responses = document.querySelector('#response');
var quizEndScreen = document.querySelector('#end-screen');
var countdown;
var userScore = 0;
var scoreDisplay = document.querySelector('#score');
var submitBtn = document.querySelector('#submit');
var initials = document.querySelector('#initials');

function startQuiz() {
    //initiates the quiz by hiding the starting elements
    var initiateQuizFromBtn = document.getElementById('starting-point');
    initiateQuizFromBtn.setAttribute('class', 'hide');

    // reveals the previously hidden questions section of HTML
    quizQuestions.removeAttribute('class');

    // starts the timer
    countdown = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft;
    }, 1000);
    // calling the function that will run the next part of the quiz. Which grabs the first question and displays on screen
    nextQuestion();
}

function nextQuestion() {
    // the starting point for the quiz. Tells JS to start at question 0 and logs it to a variable
    var currentQuestion = questions[currentQuestionIndex];
    // grabs the area in the html for the question to display and then displays it on screen
    var questionDisplay = document.getElementById('questions-title');
    questionDisplay.textContent = currentQuestion.title;

    answers.innerHTML = '';

    // loops over the choices from the questions JS page and creates a button for every choice
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var answer = currentQuestion.choices[i];
        var answerBtn = document.createElement('button');
        answerBtn.setAttribute('class', 'choice');
        answerBtn.setAttribute('value', answer);
        answerBtn.addEventListener('click', selectingAnswer);

        answerBtn.textContent = i + 1 + '. ' + answer;
        // adds the answer buttons to the variable which loads it to the page 
        answers.appendChild(answerBtn);
    }

}

function selectingAnswer(event) {
    // applies an event target to the selected answer
    var selectedAnswer = event.target;

    // checking if the answer clicked by the user is wrong and if it is wrong issuing the penalty
    if (selectedAnswer.value !== questions[currentQuestionIndex].answer) {
        timeLeft -= 15;
        // making sure the timer doesnt go below 0 and if it reaches 0 the quiz ends
        if (timeLeft < 0) {
            timeLeft = 0;
            endQuiz();
        }

        timer.textContent = timeLeft;

        responses.textContent = 'incorrect!';

    } else {
        responses.textContent = 'Correct!';
        userScore++;
    }
    // brings up the affirmations at the bottom of the screen to tell the user if they chose correct or incorrect answers
    responses.setAttribute('class', 'responses');
    setTimeout(function () {
        responses.setAttribute('class', 'hide-response');
    }, 1000);
    // moves the logic to the next question to pull through the next set of questions and answers
    currentQuestionIndex++;

    if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        nextQuestion();
    }

}
// tells the logic what to do when the quiz comes to and end and that function is called
function endQuiz() {
    // hides the quiz content. shows the 
    quizQuestions.setAttribute('class', 'hide');
    quizEndScreen.removeAttribute('class', 'hide');
    clearInterval(countdown);
    scoreDisplay.textContent = userScore;

}
function saveScore() {
    // makes sure that when the user enters their initials there is no dead space
    var playerName = initials.value.trim();
    //puts the scores into the local stoage
    var playerScore = JSON.parse(window.localStorage.getItem('highscores')) || [];
    // saves the user name and their score to an object
    var newScore = {
        score: userScore,
        initials: playerName,
    };
    // combines the plays score and initials then turns them into a string to save into the local storage
    playerScore.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(playerScore));
    // moves the user to the high scores page
    window.location.href = 'highscores.html';
}

startBtn.addEventListener('click', function () {
    startQuiz();
});

submitBtn.addEventListener('click', saveScore);