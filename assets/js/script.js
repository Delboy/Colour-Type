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

    let gameLive = document.getElementById('box');
    gameLive.style.backgroundColor = 'green';
    
    answer.value = '';
    generateQuestion();
    gameTimer();
    roundTimer();
    
}

/**
 * Starts 20 second timer. 
 * Starts countdown clock.
 * Ends game once finished.
 */
function gameTimer(){
    
    setTimeout(endGame, 20000);
    clock = setInterval(countDown, 1000);

    let timerSound = new Audio("assets/sounds/countdown.wav");

    if (mute.checked) {
            '';
    } else {
        timerSound.play();
        setTimeout(function(){
            timerSound.pause();
            }, 19999) /*Set at 19999 to stop sound just before score alert pops.*/
        };

    document.addEventListener('change', function(){
        let muteCheckBox = document.getElementById('mute');
        let live = document.getElementById('box');
        if (live.style.backgroundColor === 'red') {
            '';
        } else if ((live.style.backgroundColor === 'green') && (muteCheckBox.checked)) {
            timerSound.pause();
            timerSound.currentTime = 0;
        } else {
            timerSound.play();
            let timeLeft = parseInt(document.getElementById('game-time').innerText);
            console.log(timeLeft);
            setTimeout(function(){
                timerSound.pause();
                }, `${timeLeft}000`);
        }
    })
}

/**
 * Takes timer and begins counting down by 1.
 */
function countDown(){
    let timer = parseInt(document.getElementById('game-time').innerText);
    
    document.getElementById('game-time').innerText = timer - 1;
}

/**
 * Starts round timer.
 * Length of timer is set from 'options' section.
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
        console.log('check colour working if correct');
        playSound('correct');
        // correctSound = new Audio("assets/sounds/correct.wav").play();
    } else {
        document.getElementById('answer').value = '';
        console.log('check colour working if incorrect');
        // inCorrectSound = new Audio("assets/sounds/incorrect.mp3").play();
        playSound('incorrect');
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
        console.log('check word working if correct');
        playSound('correct');
        // correctSound = new Audio("assets/sounds/correct.wav").play();
    } else {
        document.getElementById('answer').value = '';
        console.log('check word working if incorrect');
        // inCorrectSound = new Audio("assets/sounds/incorrect.mp3").play();
        playSound('incorrect');
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
}

/**
 * Alerts user of score achieved.
 */
function endGame(){

    let highScore = parseInt(document.getElementById('highscore').innerText);
    let score = parseInt(document.getElementById('score').innerText);
   
    
    if (score > highScore) {
        document.getElementById('highscore').innerText = score;
        playSound('beatHS');
    } else {
        playSound('win');
    }
    
    alert('well done! You\'ve scored ' + score);
    document.getElementById('score').innerText = 0;

    let submitBtn = document.getElementById('submit-btn');
    submitBtn.style.visibility = 'hidden';

    let hideElements = document.getElementsByClassName('hide');
        for (let i = 0; i < hideElements.length; i++) {
        hideElements[i].style.visibility = 'visible';
    };

    let gameLive = document.getElementById('box');
    gameLive.style.backgroundColor = 'red';

    let startBtn = document.getElementById('start-btn');
    startBtn.focus();

    clearInterval(round);
    clearInterval(clock);

    let timer = document.getElementById('game-time');
    timer.innerText = 20;
}

function playSound(x) {
    if (mute.checked) {
        ''
    } else if (x === 'correct') {
        new Audio("assets/sounds/correct.wav").play();
    } else if (x === 'incorrect') {
        new Audio("assets/sounds/incorrect.mp3").play();
    } else if (x === 'win') {
        new Audio("assets/sounds/win.wav").play();
    } else if (x === 'beatHS') {
        new Audio("assets/sounds/fanfare.wav").play();
    } 
}
