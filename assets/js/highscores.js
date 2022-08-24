var clearScores = document.querySelector('#clear-scores');
var backToQuizz = document.querySelector('#return-quiz');

function getScores() {
    var scores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    scores.sort(function (a, b) {
        return b.score - a.score;
    }
    );

    for (var i = 0; i < scores.length; i += 1) {
        var liEl = document.createElement('li');
        liEl.textContent = scores[i].initials + ' - ' + scores[i].score;

        var olEl = document.getElementById('scores');
        olEl.appendChild(liEl);
    }


}

function eraseScores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

clearScores.addEventListener('click', eraseScores);
backToQuizz.addEventListener('click', function () {
    window.location.href = 'index.html';
})

getScores();