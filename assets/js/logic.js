var timeLeft = questions.length * 15;
var currentQuestionIndex = 0;
var startBtn = document.querySelector('#start-btn');
var quizQuestions = document.querySelector('#questions');
var timer = document.querySelector('#time');
var answers = document.querySelector('#answers');

function startQuiz() {
    //initiates the quiz by hiding the starting elements
    var initiateQuizFromBtn = document.getElementById('starting-point');
    initiateQuizFromBtn.setAttribute('class', 'hide');
    // reveals the previously hidden questions section of HTML
    quizQuestions.removeAttribute('class');
    // starts the timer
    var countdown = setInterval(function(){
        timeLeft--;
        timer.textContent = timeLeft;
    }, 1000);
    
    displayQuiz();
}

function displayQuiz(){

    var currentQuestion = questions[currentQuestionIndex];

    var questionDisplay = document.getElementById('questions-title');
    questionDisplay.textContent = currentQuestion.title;

    for (var i = 0; i< currentQuestion.choices.length; i++) {
        var answer = currentQuestion.choices[i];
        var answerBtn = document.createElement('button');
        answerBtn.setAttribute('class', 'choice');
        answerBtn.setAttribute('value', answer);

        answerBtn.textContent = i + 1 + '. ' + answer;

        answers.appendChild(answerBtn);
    }

}

startBtn.addEventListener('click', function() {
    startQuiz();
});