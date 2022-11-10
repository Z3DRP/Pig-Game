'use strict';

const player0Elmnt = document.querySelector('.player--0');
const player1Elmnt = document.querySelector('.player--1');
// select score elements 
const score0Elmnt = document.querySelector('#score--0');
const score1Elmnt = document.getElementById('score--1');
const diceElmnt = document.querySelector('.dice');

// select playerScoreElemnt
const currentScore0Elmnt = document.getElementById('current--0');
const currentScore1Elmnt = document.getElementById('current--1');


const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let playing, currentScore, activePlayer, scores;

const init = function() {
    playing = true;
    score0Elmnt.textContent = 0;
    score1Elmnt.textContent = 0;
    //diceElmnt.classList.add('hidden');
    currentScore = 0;
    activePlayer = 0;
    scores = [0,0];
    showDice(false);
    currentScore0Elmnt.textContent = 0;
    currentScore1Elmnt.textContent = 0;
    player0Elmnt.classList.remove('player--winner');
    player1Elmnt.classList.remove('player-winner');
    player0Elmnt.classList.add('player--active');
    player1Elmnt.classList.remove('player--active');
}

// initialize starting conditions
init();

//rolling dice functionality
rollBtn.addEventListener('click', function(){
    if (playing){
        let numberRolled = Math.trunc(Math.random() * 6) + 1;
        showDice(true);
        diceElmnt.src = `datafiles/dice-${numberRolled}.png`;
        // if dice = 1 switch players if not add roll to score
        if (numberRolled !== 1) {
            currentScore += numberRolled;
            // function that dynamically set active players score
            setCurrentPlayerScoreElement(currentScore);
        } else {
            switchPlayer();
        }
    }
});

// hold functionality
holdBtn.addEventListener('click', function(){
    if(playing){
        scores[activePlayer] += currentScore;
        // sets the score at the top
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100){
            // finish game
            playing = false;
            // document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            enablePlayerWinner(true);
        } else {
            switchPlayer();
        }
    }
});

// new game functionality
newBtn.addEventListener('click', function(){
    init();
});

function switchPlayer(){
    // set active players score element then reset score to 0 then switch players
    currentScore = 0;
    setCurrentPlayerScoreElement(currentScore);
    activePlayer = activePlayer === 0 ? 1 : 0;
    highlightActivePlayer();
}

function enablePlayerWinner(enable){
    switch(enable){
        case true:
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            break;
        case false:
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
            break;
    }
}
function highlightActivePlayer() {
    // toggle adds class if not there or removes if class is there
    player0Elmnt.classList.toggle('player--active');
    player1Elmnt.classList.toggle('player--active');
}

// sets the score element to value of current score
function setCurrentPlayerScoreElement(currScore){
    // dynamically sets active players score
    document.getElementById(`current--${activePlayer}`).textContent = currScore;
}
function resetAllScores(){
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    scores[0] = 0;
    scores[1] = 0;
    document.getElementById(`score--0`).textContent = scores[0];
    document.getElementById(`score--1`).textContent = scores[1];
}

function showDice(visible){
    switch(visible){
        case true:
            diceElmnt.classList.remove('hidden');
            break;
        case false:
            diceElmnt.classList.add('hidden');
            break;
    }
}
