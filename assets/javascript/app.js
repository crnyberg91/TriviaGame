window.onload = function() {
	$("#start").on("click", timer);
};

let timeLeft = 10;
let timerRunning = false;
let nextQuestion = false;
let intervalId;
let nextQTime;
let answerClick = false;
let i = 0;
let answer;
let correctCount = 0;
let wrongCount = 0;
let answerGif;
const gifBox = $("<img>");

const question = {
	q: "Who played Jimmy 'Popeye' Doyle in 'The French Connection'?",
	a: "Gene Hackman",
	b: "Christopher Walken",
	c: "Marlon Brando",
	d: "Steve Mcqueen",
	movieGif: "Gene Hackman",
	correct: "a"
};

const question2 = {
	q: "Who directed psycho?",
	a: "Stanley Kubrick",
	b: "Alfred Hitchcock",
	c: "David Lean",
	d: "Michael Curtiz",
	movieGif: "alfred hitchcock",
	correct: "b"
};
const question3 = {
	q: "which actor was in 'The Godfather', 'Dog Day Afternoon', and 'The Conversation'?",
	a: "Al Pacino",
	b: "Robert Duvall",
	c: "John Cazale",
	d: "Allen Garfield",
	movieGif: "john cazale",
	correct: "c"
};
const question4 = {
	q: "Finish this quote: 'Charlie don't __!",
	a: "ski",
	b: "surf",
	c: "ride",
	d: "sleep",
	movieGif: "robert duvall charlie",
	correct: "b"
};
const question5 = {
	q: "What is the name givento the alien in the movie 'Alien'?",
	a: "yautja",
	b: "metroid",
	c: "skrull",
	d: "xenomorph",
	movieGif: "xenomorph",
	correct: "d"
};
const question6 = {
	q: "What Japanese movie is regarded as the first 'kaiju' film?",
	a: "Gojira",
	b: "Rodan",
	c: "Mothra",
	d: "Gamera",
	movieGif: "godzilla",
	correct: "a"
};
const question7 = {
	q: "the original King Kong came out in what year?",
	a: "1940",
	b: "1933",
	c: "1952",
	d: "1924",
	movieGif: "king kong",
	correct: "b"
};
const question8 = {
	q: "Before they were a successfull movie director, they started off as a director of skate videos and music videos. who were they?",
	a: "Joel Coen",
	b: "Quentin Tarantino",
	c: "Spike Jonze",
	d: "Christopher Nolan",
	movieGif: "spike jonze",
	correct: "c"
};
const question9 = {
	q: "what actress won the oscar for actress in a supporting role in 1993?",
	a: "Susan Surandon",
	b: "Helen Mirren",
	c: "Kathy Bates",
	d: "Marisa Tomei",
	movieGif: "marisa tomei",
	correct: "d"
};
const question10 = {
	q: "What car was Barry Newman driving the 1971 movie 'Vanishing Point'",
	a: "Challenger",
	b: "Camaro",
	c: "Fairlady z",
	d: "GT40",
	movieGif: "barry newmoan vanishing point",
	correct: "a"
};

//array of questions thatll loop through as timer gets reset
const questionArr = [question, question2, question3, question4, question5, question6, question7, question8, question9, question10];
// const gif = $("<img>").attr("src", queryURL);

function timer() {
	$("#start").remove();
	$("#time-line").html(`<p>10 seconds left</p>`);

	if (!timerRunning) {
		timerRunning = true;
		intervalId = setInterval(countdown, 1000);
		displayQuestion();
		nextQTime = 10;
	}
}

//stop function, switches timeRunning to false
function stop() {
	clearInterval(intervalId);
	timerRunning = false;
	//answered function
}

function countdown() {
	timeLeft--;
	$("#time-line").html(`<p>${timeLeft} seconds left</p>`);

	if (timeLeft === 0) {
		stop();
		console.log("times up");
		answered();
	} else if (answerClick) {
		stop();
		console.log("clicked an answer");
	}
}

function nextQTimeF() {
	$("#questions-box").empty();
	nextQTime = setTimeout(timer, 1000 * 5);
	timeLeft = 10;
}

function renderGif() {
	const queryURL =
		"https://api.giphy.com/v1/gifs/search?q=" + questionArr[i].movieGif + "&api_key=71CC8xrnJJ8IIjyInSFxGAU5bUlFj3BU&limit=1";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response, i, response.data[i]);
		answerGif = response.data[0].images.fixed_height.url;
		$("questions-box").append(gifBox);
		gifBox.attr("src", answerGif);
	});
}

function displayQuestion() {
	$("#questions-box").empty();
	nextQTime = 0;
	answerClick = false;

	$("#questions-box").append(`<h2>${questionArr[i].q}<h2>
    <div class='answer-box'>
    <button class='answer-button btn btn-outline-primary' id='a' value='a'>A: ${questionArr[i].a}</button>
    </div>
    <div class='answer-box'>
    <button class='answer-button btn btn-outline-primary' id='b' value='b'>B: ${questionArr[i].b}</button>
    </div>
    <div class='answer-box'>
    <button class='answer-button btn btn-outline-primary' id='c' value='c'>C: ${questionArr[i].c}</button>
    </div>
    <div class='answer-box'>
    <button class='answer-button btn btn-outline-primary' id='d' value='d'>D: ${questionArr[i].d}</button>
    </div>`);
	$(`#${questionArr[i].correct}`).val();
	correctChoice = questionArr[i].correct;

	console.log("correct choice " + correctChoice);
	answerSelect();

	if (i === 10) {
		endScreen();
	}
}

function answerSelect() {
	$(".answer-button").on("click", function() {
		answer = $(this).val();
		answerClick = true;
		console.log(answer);
		stop();
		answered();
	});
}

function answered() {
	if (timeLeft === 0) {
		nextQTimeF();
        $("#questions-box").append(`<div>Times Up</div>`);
        $("#questions-box").append(gifBox);
		renderGif();
		wrongCount++;
	} else if (answer === correctChoice) {
		stop();
		nextQTimeF();
		$("#questions-box").append(`<div>Correct</div>`);
		$("#questions-box").append(gifBox);
		renderGif();
		correctCount++;
	} else {
		stop();
		nextQTimeF();
		$("#questions-box").append(`<div>Wrong</div>`);
		$("#questions-box").append(gifBox);
		renderGif();
		wrongCount++;
	}
	i++;
}

function endScreen() {
	stop();
	$("#questions-box").empty();
	$("#questions-box").append(`
    <h2>Finished!</h2>
    <h5>Answers Correct: ${correctCount}</h5>
    <h5>Answers Correct: ${wrongCount}</h5>
    <div class='reset-box'>
    <button class='reset-button' id='reset'>Play Again?</button>
    `);
	reset();
}

function reset() {
	$("#reset").on("click", function() {
		wrongCount = 0;
		correctCount = 0;
		i = 0;
		displayQuestion();
	});
}
