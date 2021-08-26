
generateQuestion();

document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementById('button');
    button.addEventListener('click', function() {
        checkQuestion();
        
    })
    
})



function runGame(){
  
}

function gameTimer(){

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

}
