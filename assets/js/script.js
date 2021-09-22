// Declare global variables
let timers = {
    clock: 0,
    round: 0,
    opacity: 0,
};

// Wait for DOM to finish loading before enabling start game button
// Adds event listeners for all clickable elements
document.addEventListener("DOMContentLoaded", function () {
    let startBtn = document.getElementById('start-btn');
    startBtn.focus();
    startBtn.addEventListener('click', runGame);

    // Refocuses Answer field after options changed
    let options = document.getElementsByClassName('option');
    const answer = document.getElementById('answer');
    for (let option of options) {
        option.addEventListener('click', function () {
            answer.focus();
        });
    }

    // Opens rules when cheveron clicked
    let rulesExit = document.getElementById('rules-exit');
    let rules = document.getElementById('rule-area');
    document.getElementsByClassName('fas fa-chevron-down')[0].addEventListener('click', function () {
        if (window.innerWidth > 700) {
            rules.style.visibility = 'visible';
            rulesExit.style.visibility = 'visible';
            playSound('click.wav');
        } else {
            rules.style.visibility = 'visible';
            playSound('click.wav');
        }
    });

    //Closes rules when 'x' clicked
    rulesExit.addEventListener('click', function () {
        rules.style.visibility = 'hidden';
        rulesExit.style.visibility = "hidden";
        playSound('click.wav');
    });
    // Closes 'rules' if touched anywhere on phone size screens
    if (window.innerWidth <= 700) {
        rules.addEventListener('click', function () {
            rules.style.visibility = 'hidden';
            playSound('click.wav');
        });
    }

    // Keeps rules visible if window resized while rules showing
    window.addEventListener('resize', function () {
        if (this.window.innerWidth > 1490) {
            rules.style.visibility = 'visible';
            rulesExit.style.visibility = 'hidden';
        } else {
            rules.style.visibility = 'hidden';
            rulesExit.style.visibility = 'hidden';
        }
    });

    // Event listener for enter key. Causes different function to run depending if game is running.
    let gameLive = document.getElementById('box');
    document.getElementById('answer').addEventListener('keydown', function (event) {
        if ((event.key === 'Enter') && (gameLive.style.backgroundColor === 'green')) {
            checkQuestion();
        } else if (event.key === 'Enter') {
            runGame();
        }
    });
});

/**
 * Starts game by generating first question and beginning game and round timers.
 * Called when 'Start game' button clicked or enter key pressed. 
 */
function runGame() {

    let answer = document.getElementById('answer');
    answer.focus();

    // disable options
    let disable = document.getElementsByClassName('disable');
    for (let i = 0; i < disable.length; i++) {
        disable[i].disabled = true;
    }

    // Change box to green indicating game is live
    let gameLive = document.getElementById('box');
    gameLive.style.backgroundColor = 'green';

    // Generate first question and start timers
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
function gameTimer() {
    setTimeout(endGame, 20000);
    timers.clock = setInterval(countDown, 1000);
}

/**
 * Takes timer and begins counting down by 1.
 */
function countDown() {
    let timer = parseInt(document.getElementById('game-time').innerText);
    document.getElementById('game-time').innerText = timer - 1;
    playSound('tick.wav');
}

/**
 * Starts round timer.
 * Length of timer is set from 'options' section.
 */
function roundTimer() {
    let normal = document.getElementById('normal');
    let hard = document.getElementById('hard');
    if (normal.checked) {
        timers.round = setInterval(generateQuestion, 4000);
    } else if (hard.checked) {
        timers.round = setInterval(generateQuestion, 2000);
    } else {
        timers.round = setInterval(generateQuestion, 20000);
    }
}

/**
 * Genrates a random condition and colour to form the next question.
 */
function generateQuestion() {
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
function checkQuestion() {
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
function checkColour() {
    let answer = document.getElementById('answer');
    let colour = document.getElementById('cond2');

    if (answer.value.toLowerCase() === colour.style.color) {
        addScore();
        generateQuestion();
        clearInterval(timers.round);
        roundTimer();
        document.getElementById('answer').value = '';
        console.log('check colour working if correct');
        playSound('correct.wav');
    } else {
        document.getElementById('answer').value = '';
        console.log('check colour working if incorrect');
        playSound('incorrect.mp3');
        flash();
    }
}

/**
 * Takes users answer and checks if its correct.
 */
function checkWord() {
    let colour = document.getElementById('cond2');
    let answer = document.getElementById('answer');

    if (answer.value.toLowerCase() === colour.textContent.toLowerCase()) {
        addScore();
        generateQuestion();
        clearInterval(timers.round);
        roundTimer();
        document.getElementById('answer').value = '';
        console.log('check word working if correct');
        playSound('correct.wav');
    } else {
        document.getElementById('answer').value = '';
        console.log('check word working if incorrect');
        playSound('incorrect.mp3');
        flash();
    }
}

/**
 * Takes users score and increments it by amount determined by difficulty chosen.
 * Updates highscore if current score exceeded it.
 */
function addScore() {
    let score = parseInt(document.getElementById('score').innerText);
    let easy = document.getElementById('easy');
    let normal = document.getElementById('normal');

    if (easy.checked) {
        document.getElementById('score').innerText = ++score;
    } else if (normal.checked) {
        document.getElementById('score').innerText = score + 2;
    } else {
        document.getElementById('score').innerText = score + 3;
    }
}

/**
 * Ends game.
 * Alerts user of score achieved.
 * Resets timers.
 */
function endGame() {
    let highScore = parseInt(document.getElementById('highscore').innerText);
    let score = parseInt(document.getElementById('score').innerText);
    let feedback = document.getElementById('feedback');
    let feedbackArea = document.getElementById('feedback-area');
    let main = document.getElementById('main');
    let answer = document.getElementById('answer');

    answer.blur();

    // Checks score and displays corrosponding feedback message. 
    feedbackArea.style.visibility = 'visible';

    if (score === 0) {
        playSound('lose.wav');
        feedback.innerText = "Oh no! You scored ZERO! Did you read the rules correctly?. Why not try again?";
        main.style.opacity = '30%';
    } else if (score > highScore) {
        document.getElementById('highscore').innerText = score;
        playSound('fanfare.wav');
        feedback.innerText = "Well Done! You scored " + `${score}` + " and beat your highscore of " + `${highScore}.` + " Why not try again to score even higher!";
        main.style.animation = 'background-color-change 500ms 4';
        timers.opacity = setTimeout(function () {
            main.style.opacity = '30%';
        }, 2000);
    } else {
        playSound('win.wav');
        feedback.innerText = "Well Done! You scored " + `${score}` + ". Why not try again to beat your highscore of " + `${highScore}.`;
        main.style.opacity = '30%';
    }

    // Closes feedback box when clicked or enter pressed
    document.getElementById('feedback-exit').addEventListener('click', function () {
        feedbackArea.style.visibility = 'hidden';
        main.style.opacity = '100%';
        main.style.animation = '';
        answer.focus();
    });

    if (window.innerWidth < 700) {
        feedbackArea.addEventListener('click', function () {
            feedbackArea.style.visibility = 'hidden';
            main.style.opacity = '100%';
            main.style.animation = '';
        });
    }

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            feedbackArea.style.visibility = 'hidden';
            main.style.opacity = '100%';
            main.style.animation = '';
            answer.focus();
            clearTimeout(timers.opacity);
        }
    });

    // Resets score
    document.getElementById('score').innerText = 0;

    // Enables options
    let disable = document.getElementsByClassName('disable');
    for (let i = 0; i < disable.length; i++) {
        disable[i].disabled = false;
    }

    // Changes box to red to indicate game not running
    let gameLive = document.getElementById('box');
    gameLive.style.backgroundColor = 'red';

    // Clears timers
    clearInterval(timers.round);
    clearInterval(timers.clock);
    let timer = document.getElementById('game-time');
    timer.innerText = 20;
}

/**
 * Plays sound effect
 */
function playSound(x) {
    let mute = document.getElementById('mute');

    if (mute.checked === false) {
        new Audio("assets/sounds/" + x).play();
    }
}

/**
 * Flashes answer box red for split second.
 */
function flash() {
    let answer = document.getElementById('answer');
    answer.style.backgroundColor = 'red';
    setTimeout(function () {
        answer.style.backgroundColor = '';
    }, 50);
}