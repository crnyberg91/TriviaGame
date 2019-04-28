window.onload = function() {
    $('#start').on('click', timer)
    
}

let correct = false;
let timeLeft = 10;
var timerRunning = false;
var nextQuestion = false;
var intervalId;
var nextQTime;

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

function timer() {
    $('#start').remove()
    $('#time-line').html(`<p>30 seconds left</p>`);
    
    if (!timerRunning) {
        timerRunning = true;
        intervalId = setInterval(countdown, 1000);
        displayQuestion();
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
    }
 
    // if (timeLeft === 0) {
    //     timerRunning = false;
    // }
}

function displayQuestion() {
    $('#questions-box').append(`<h2>${question.q}<h2>`);
    $('#questions-box').append(`<h4><a>A: ${question.a}</a></h4>`);
    $('#questions-box').append(`<h4><a>A: ${question.b}</a></h4>`);
    $('#questions-box').append(`<h4><a>A: ${question.c}</a></h4>`);
    $('#questions-box').append(`<h4><a>A: ${question.d}</a></h4>`);
}

function answered() {
    $('#questions-box').empty()
    nextQTime = setInterval(timer, 1000 * 10);
    $('#questions-box').append('it works');
    console.log(nextQTime)
    timeLeft = 10;
    //when next question timer === 0, change timeRunning to true
    //display next question
}

