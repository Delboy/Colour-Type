// Wait for DOM to finish loading before enabling start game button
// Get elements for answer field and submit button and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let startBtn = document.getElementById('start-btn');
    startBtn.focus();
    startBtn.addEventListener('click', runGame);

    let options = document.getElementsByClassName('option');
    let answer = document.getElementById('answer');
    
    for (let option of options) {
        option.addEventListener('click', function(){
            answer.focus();
        })}
    
        
    // document.getElementById('submit-btn').addEventListener('click', checkQuestion);
    
    let gameLive = document.getElementById('box'); 

    document.getElementById('answer').addEventListener('keydown', function(event) {
        if ((event.key === 'Enter') && (gameLive.style.backgroundColor === 'green')) {
            checkQuestion();
            console.log('enter and green');
        } else if (event.key === 'Enter') {
            runGame();
            console.log('enter');
        }
    })
})

/**
 * Starts game by generating first question and beginning game and round timers.
 * Called when 'Start game' button clicked. 
 */
function runGame(){
    // let submitBtn = document.getElementById('submit-btn');
    // submitBtn.style.visibility = 'visible';
    
    document.getElementById('answer').focus();

    let hideElements = document.getElementsByClassName('hide');
        for (let i = 0; i < hideElements.length; i++) {
        hideElements[i].style.visibility = 'hidden';
    };

    let disable = document.getElementsByClassName('disable');
    for (let i = 0; i < disable.length; i++) {
        disable[i].disabled = true;
    };

    document.getElementById("easy").disabled = true;

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
}

/**
 * Takes timer and begins counting down by 1.
 */
function countDown(){
    let timer = parseInt(document.getElementById('game-time').innerText);
    document.getElementById('game-time').innerText = timer - 1;
    playSound('tick.wav');
}

/**
 * Starts round timer.
 * Length of timer is set from 'options' section.
 */
function roundTimer(){
    if (normal.checked) {
        round = setInterval(generateQuestion, 4000);
    } else if (hard.checked) {
        round = setInterval(generateQuestion, 2000);
    } else {
        round = setInterval(generateQuestion, 20000);
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
        playSound('correct.wav');
    } else {
        document.getElementById('answer').value = '';
        console.log('check colour working if incorrect');
        playSound('incorrect.mp3');
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
        playSound('correct.wav');
    } else {
        document.getElementById('answer').value = '';
        console.log('check word working if incorrect');
        playSound('incorrect.mp3');
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
    let feedback = document.getElementById('feedback');
    
    if (score === 0) {
        playSound('lose.wav');
        feedback.innerText = "Oh no! You scored ZERO! Did you read the rules correctly?. Hit enter to try again."
    } else if (score > highScore) {
        document.getElementById('highscore').innerText = score;
        playSound('fanfare.wav');
        feedback.innerText = "Well Done! You scored " + `${score}` + " and beat your highscore of " + `${highScore}.` + " Hit enter to try again!";
    } else {
        playSound('win.wav');
        feedback.innerText = "Well Done! You scored " + `${score}` + ". Hit enter to try again and beat your highscore of " + `${highScore}.`;
    };
    
    document.getElementById('score').innerText = 0;

    // let submitBtn = document.getElementById('submit-btn');
    // submitBtn.style.visibility = 'hidden';

    let hideElements = document.getElementsByClassName('hide');
        for (let i = 0; i < hideElements.length; i++) {
        hideElements[i].style.visibility = 'visible';
    };

    let disable = document.getElementsByClassName('disable');
    for (let i = 0; i < disable.length; i++) {
        disable[i].disabled = false;
    };

    let gameLive = document.getElementById('box');
    gameLive.style.backgroundColor = 'red';

    let startBtn = document.getElementById('start-btn');
    startBtn.focus();

    clearInterval(round);
    clearInterval(clock);

    let timer = document.getElementById('game-time');
    timer.innerText = 20;

    let endMessage = document.getElementById('feedback-area');
    let answer = document.getElementById('answer');
    let exit = document.getElementById('exit').addEventListener('click', function(){
            endMessage.style.visibility = 'hidden';
            answer.focus();
    })
}

/**
 * Plays sound effect
 */
function playSound(x) {
    if (mute.checked) {
        '';
    } else {
        new Audio("assets/sounds/" + x).play();
    }
}
        

