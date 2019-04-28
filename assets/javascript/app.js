window.onload = () => {
    $('#start').on('click', timer);


}

let correct = false;
let timeLeft = 10;
var timerRunning = false;
var nextQuestion = false;
var intervalId;

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
    clearInterval(intervalId);
    intervalId = setInterval(countdown, 1000);
    displayQuestion();
    timerRunning = true;
    if(!timerRunning) {
        clearInterval(intervalId);
        //answered function
    }
}

function countdown() {
    timeLeft--;
    $('#time-line').html(`<p>${timeLeft} seconds left</p>`);

    if (timeLeft === 0) {
        timerRunning = false;
        intervalId = clearInterval(timeLeft);
    }
}

function displayQuestion () {
    $('#questions-box').append(`<h2>${question.q}<h2>`);
    $('#questions-box').append(`<h4>A: ${question.a}</h4>`);
    $('#questions-box').append(`<h4>A: ${question.b}</h4>`);
    $('#questions-box').append(`<h4>A: ${question.c}</h4>`);
    $('#questions-box').append(`<h4>A: ${question.d}</h4>`);
}

function answered() {
    //start new timer for next question
    //if correct wincount++ else wrongCount++
    //when next question timer === 0, change timeRunning to true
    //display next question
}

