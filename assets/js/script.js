document.addEventListener('keydown', function(event) {
    if(event.key ==='Enter') {
        generateQuestion();
    }
})

function runGame(){
    generateQuestion();
    
}

function gameTImer(){

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

}

function checkColour(){

}

function checkWord(){

}

function addScore(){

}
