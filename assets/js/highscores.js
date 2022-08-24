var scoreList = document.querySelector('#scores');
var highscores = [];


function createList() {

    for (var i = 0; i < highscores.length; i++) {
        var highscores = highscores[i];

        var li = document.createElement("li");
        li.textContent = highscores;
        li.setAttribute("data-index", i);
    }
}

function retrieveScores() {

    var playerInt = localStorage.getItem("initials");
    var storedScores = localStorage.getItem("score");

    if (storedScores !== null) {
        highscores = storedScores;
    }

    createList();
    console.log(playerInt);
}

retrieveScores()