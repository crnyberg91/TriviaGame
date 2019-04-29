window.onload = function() {
    $('#start').on('click', timer)
    
}

let correct = false;
let timeLeft = 10;
var timerRunning = false;
var nextQuestion = false;
var intervalId;
var nextQTime;
var answerClick = false;


const question = {
    q: 'is this working',
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    gif: 'giphyurl',
    correct() {

    }
}

const question2 = {
    q: 'is this working2',
    a: 'a2',
    b: 'b2',
    c: 'c2',
    d: 'd2',
    gif: 'giphyurl',
    correct() {

    }
}
var questionArr = [question, question2];


function timer() {
    $('#start').remove()
    $('#time-line').html(`<p>30 seconds left</p>`);
    
    if (!timerRunning) {
        timerRunning = true;
        intervalId = setInterval(countdown, 1000);
        displayQuestion();
        nextQTime = 10;
    }
}

function stop() {
    clearInterval(intervalId);
    timerRunning = false;
    //answered function
}

function countdown() {
    timeLeft--;
    $('#time-line').html(`<p>${timeLeft} seconds left</p>`);

    if (timeLeft === 0) {
        stop();
        console.log('times up');
        answered();
    } else if(answerClick){
        stop();
        console.log('clicked an answer')
    }
 
    // if (timeLeft === 0) {
    //     timerRunning = false;
    // }
}

function displayQuestion() {
    let i= 0;
    $('#questions-box').append(`<h2>${questionArr[i].q}<h2>`);
    $('#questions-box').append(`<h4>A: ${questionArr[i].a}</h4>`);
    $('#questions-box').append(`<h4>B: ${questionArr[i].b}</h4>`);
    $('#questions-box').append(`<h4>C: ${questionArr[i].c}</h4>`);
    $('#questions-box').append(`<h4>D: ${questionArr[i].d}</h4>`);
    i++;
}

function answered() {
    $('#questions-box').empty()
    nextQTime = setInterval(timer, 1000 * 5);
    $('#questions-box').append('it works');
    console.log(nextQTime)
    timeLeft = 10;
    //when next question timer === 0, change timeRunning to true
    //display next question
}

