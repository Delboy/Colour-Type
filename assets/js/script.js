document.addEventListener("DOMContentLoaded", function() {
    let startBtn = document.getElementById('start-btn');
    startBtn.focus();
    startBtn.addEventListener('click', runGame);
})


document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementById('submit-btn');
    button.addEventListener('click', function() {
        checkQuestion();
    })
    
})

function runGame(){
    let submitBtn = document.getElementById('submit-btn');
    submitBtn.style.visibility = 'visible';
    submitBtn.focus();

    let hideElements = document.getElementsByClassName('hide');
        for (let i = 0; i < hideElements.length; i++) {
        hideElements[i].style.visibility = 'hidden';
    }
    
    generateQuestion();
    gameTimer();
    roundTimer();
}

function gameTimer(){
    setTimeout(endGame, 20000);
}

function roundTimer(){

}

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

function checkQuestion(){
    let condition = document.getElementById('cond1');

    if (condition.textContent === 'colour') {
        checkColour();
    } else {
        checkWord();
    }
}

function checkColour(){
    let answer = document.getElementById('answer');
    let colour = document.getElementById('cond2');

    if (answer.value.toLowerCase() === colour.style.color) {
        addScore();
        generateQuestion();
        console.log('check colour working if correct')
    } else {
        console.log('check colour working if incorrect')
    }
}

function checkWord(){
    let colour = document.getElementById('cond2');

    if (answer.value.toLowerCase() === colour.textContent.toLowerCase()) {
        addScore();
        generateQuestion();
        console.log('check word working if correct')
    } else {
        console.log('check word working if incorrect')
    }
}

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

function endGame(){
    let score = document.getElementById('score');
    alert('well done! You\'ve scored ' + score.textContent)
    console.log(score);
    score.textContent = 0;

    let submitBtn = document.getElementById('submit-btn');
    submitBtn.style.visibility = 'hidden';

    let hideElements = document.getElementsByClassName('hide');
        for (let i = 0; i < hideElements.length; i++) {
        hideElements[i].style.visibility = 'visible';
    }
}
