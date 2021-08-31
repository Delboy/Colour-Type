// Wait for DOM to finish loading before enabling start game button
// Get elements for answer field and submit button and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let startBtn = document.getElementById('start-btn');
    startBtn.focus();
    startBtn.addEventListener('click', runGame);

    document.getElementById('submit-btn').addEventListener('click', checkQuestion);
    
    document.getElementById('answer').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkQuestion();
        }
    })
})

/**
 * Starts game by generating first question and beginning game and round timers.
 * Called when 'Start game' button clicked. 
 */
function runGame(){
    let submitBtn = document.getElementById('submit-btn');
    submitBtn.style.visibility = 'visible';
    
    document.getElementById('answer').focus();

    let hideElements = document.getElementsByClassName('hide');
        for (let i = 0; i < hideElements.length; i++) {
        hideElements[i].style.visibility = 'hidden';
    }
    
    answer.value = '';
    generateQuestion();
    gameTimer();
    roundTimer();
}

/**
 * Starts 20 second timer. Ends game once finished.
 */
function gameTimer(){
    setTimeout(endGame, 20000);
}

/**
 * Starts round timer.
 * Length of timer is set from 'difficulty' section.
 */
function roundTimer(){
    
    if (normal.checked) {
        round = setInterval(generateQuestion, 4000);
    } else if (hard.checked) {
        round = setInterval(generateQuestion, 3000);
    } 
}

/**
 * Genrates a random condition and colour to form the next question.
 */
function generateQuestion(){
    let conditions = ['word', 'colour'];
    let colours = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Pink', 'Black'];

    let randomCondition = Math.floor(Math.random() * conditions.length);
    let randomColour = Math.floor(Math.random() * colours.length);
    let randomStyle = Math.floor(Math.random() * colours.length);

    let condition = document.getElementById('cond1');
    let colour = document.getElementById('cond2');

    condition.textContent = conditions[randomCondition];
    colour.textContent = colours[randomColour];
    colour.style.color = colours[randomStyle];
}

/**
 * Checks for what question was generated
 */
function checkQuestion(){
    let condition = document.getElementById('cond1');

    if (condition.textContent === 'colour') {
        checkColour();
    } else {
        checkWord();
    }
}

/**
 * Takes users answer and checks if its correct.
 */
function checkColour(){
    let answer = document.getElementById('answer');
    let colour = document.getElementById('cond2');

    if (answer.value.toLowerCase() === colour.style.color) {
        addScore();
        generateQuestion();
        clearInterval(round);
        roundTimer();
        document.getElementById('answer').value = '';
        console.log('check colour working if correct')
    } else {
        document.getElementById('answer').value = '';
        console.log('check colour working if incorrect')
    }
}

/**
 * Takes users answer and checks if its correct.
 */
function checkWord(){
    let colour = document.getElementById('cond2');

    if (answer.value.toLowerCase() === colour.textContent.toLowerCase()) {
        addScore();
        generateQuestion();
        clearInterval(round);
        roundTimer();
        document.getElementById('answer').value = '';
        console.log('check word working if correct')
    } else {
        document.getElementById('answer').value = '';
        console.log('check word working if incorrect')
    }
}

/**
 * Takes users score and increments it by amount determined by difficulty chosen.
 * Updates highscore if current score exceeded it.
 */
function addScore(){

    let score = parseInt(document.getElementById('score').innerText);
    
    if (easy.checked) {
        document.getElementById('score').innerText = ++score;
    } else if (normal.checked) {
        document.getElementById('score').innerText = score + 2;
    } else {
        document.getElementById('score').innerText = score +3;
    };

    let highScore = parseInt(document.getElementById('highscore').innerText);
    let currentScore = parseInt(document.getElementById('score').innerText);
    
    if (currentScore >= highScore) {
        document.getElementById('highscore').innerText = currentScore;
    }
}

/**
 * Alerts user of score achieved.
 */
function endGame(){
    let score = document.getElementById('score');
    alert('well done! You\'ve scored ' + score.textContent)
    score.textContent = 0;

    let submitBtn = document.getElementById('submit-btn');
    submitBtn.style.visibility = 'hidden';

    let hideElements = document.getElementsByClassName('hide');
        for (let i = 0; i < hideElements.length; i++) {
        hideElements[i].style.visibility = 'visible';
    };

    let startBtn = document.getElementById('start-btn');
    startBtn.focus();

    clearInterval(round);
}
