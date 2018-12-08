var time = 15;
var intervalId = "";
var incorrect = 0;
var correct = 0;
var unanswered = 0;
var arrayFinder = 0;

//questions

var question01 = {
    question: "In ‘Back to the Future’, how fast does DeLorean have to go to time travel?",
    answers: ["80 mph", "98 mph", "88 mph", "78 mph"],
    values: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "88 mph"
};

var question02 = {
    question: "Robin Williams won a best supporting actor Oscar for what film?",
    answers: ["Mrs. Doubtfire", "Jumanji", "Good Will Hunting", "Hook"],
    values: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Good Will Hunting"
};

var question03 = {
    question: "What movie has the line “You’re gonna need a bigger boat”?",
    answers: ["Evan Almighty", "Life of Pi", "Jaws", "Step Brothers"],
    values: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Jaws"
};

var question04 = {
    question: "What is the name of the serial killer in ‘Halloween’?",
    answers: ["Jigsaw", "Michael Myers", "Jason", "Oddjob"],
    values: ["incorrect", "correct", "incorrect", "incorrect"],
    correct: "Michael Myers"
};

var question05 = {
    question: "Who directed ‘Blade Runner’?",
    answers: ["Ridley Scott", "Steven Spielberg", "Quentin Tarantino", "Tim Burton"],
    values: ["correct", "incorrect", "incorrect", "incorrect"],
    correct: "Ridley Scott"
};

var question06 = {
    question: "In ‘Star Wars’, what is the name of Princess Leia’s home planet?",
    answers: ["Coruscant", "Pandora", "Mars", "Alderaan"],
    values: ["incorrect", "incorrect", "incorrect", "correct"],
    correct: "Alderaan"
};

var question07 = {
    question: "What is the name of Michael Douglas’ character in ‘Wall Street’?",
    answers: ["Patrick Bateman", "Gordon Gekko", "Jordan Belfort", "Donnie Azoff"],
    values: ["incorrect", "correct", "incorrect", "incorrect"],
    correct: "Gordon Gekko"
};

var question08 = {
    question: "What is the best-selling movie soundtrack of all time?",
    answers: ["The Bodyguard", "La La Land", "Space Jam", "Titanic"],
    values: ["correct", "incorrect", "incorrect", "incorrect"],
    correct: "The Bodyguard"
};

var question09 = {
    question: "Bruce Willis played a time traveler in what 1995 movie?",
    answers: ["Die Hard", "The Fifth Element", "Looper", "12 Monkeys"],
    values: ["incorrect", "incorrect", "incorrect", "correct"],
    correct: "12 Monkeys"
};

var question10 = {
    question: "What is the name of Kurt Russell’s character in ‘Escape from New York’?",
    answers: ["Jack Burton", "Snake Plissken", "Wyatt Earp", "Captain Ron"],
    values: ["incorrect", "correct", "incorrect", "incorrect"],
    correct: "Snake Plissken"
};

var questionsArray = [question01, question02, question03, question04, question05, question06, question07, question08, question09, question10];


function start() {
    $(".content-div").empty();
    var startButton = $("<button>");
    startButton.text("Start");
    startButton.addClass("start btn btn-default answerBtn");
    $(".content-div").append(startButton);
};

function run() {
    intervalId = setInterval(decrement, 1000);
};

function decrement() {
    time--;
    $(".timer-div").html("Time Remaining: " + time + " Seconds");
    if (time == 0) {
        if (arrayfinder < questionsArray.length-1) {
            setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
            solutionWrite(questionsArray[arrayFinder]);
            $(".question-div").html("Incorrect");
            stop();
            unanswered++;
        }
        else if (arrayFinder < questionsArray.length) {
            setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
            solutionWrite(questionsArray[arrayFinder]);
            $(".question-div").html("Incorrect");
            stop();
            unanswered++;
        }
    };
};

function stop() {
    clearInterval(intervalId);
};

function questionWrite (obj) {
    time = 15;
    $(".timer-div").empty();
    $(".timer-div").html("Time Remaining: " + time + " Seconds");
    $(".question-div").empty();
    $(".content-div").empty();
    run ();
    $(".question-div").html(obj.question);
    for (var i = 0; i < obj.answers.length; i++) {
        var answerButton = $("<button>");
        answerButton.addClass("answer btn btn-default answerBtn");
        answerButton.text(obj.answers[i]);
        answerButton.attr("value", obj.values[i]);
        $(".content-div").append(answerButton);
        $(".content-div").append("<br>");
    };
};

function solutionWrite (obj) {
    $(".question-div").empty();
    $(".content-div").empty();
    $(".content-div").html("The correct answer was " + obj.correct + "<br>");
    arrayFinder++;
};

function startWrite () {
    questionWrite(question01);
};

function answerSelect () {
    stop();
    if ($(this).attr("value") == "correct") {
        solutionWrite(questionsArray[arrayFinder]);
        $(".question-div").html("Correct");
        correct++;
        if (arrayFinder < questionsArray.length) {
            setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
        }
        else if (arrayFinder < questionsArray.length+1) {
            setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
        }
    }
    else if ($(this).attr("value") == "incorrect") {
        solutionWrite(questionsArray[arrayFinder]);
        $(".question-div").html("Incorrect");
        incorrect++;
        if (arrayFinder < questionsArray.length) {
            setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
        }
        else if (arrayFinder < questionsArray.length+1) {
            setTimout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
        }
    }
};

function endWrite () {
    $(".question-div").empty();
    $(".content-div").empty();
    $(".question-div").html("Here is how you did");
    $(".content-div").html("<p> Correct: " + correct + "</p>" + "<p> Incorrect: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>");
    var resetButton = $("<button>");
    resetButton.addClass("reset btn btn-default answerBtn");
    resetButton.text("Play Again?");
    $(".content-div").append(resetButton);
}

function resetClick () {
    arrayFinder = 0;
    incorrect = 0;
    correct = 0;
    unanswered = 0;
    startWrite();
}


$(document).on("click", ".start", startWrite);
$(document).on("click", ".answer", answerSelect);
$(document).on("click", ".reset", resetClick);

start();




