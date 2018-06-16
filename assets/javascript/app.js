// Questions & Answers 
let myQuestions = [
    {
        question: "In which film does Willem Dafoe print counterfeit money for a living?",
        answers: {
            a: "The Florida Project",
            b: "To Live and Die in L.A.",
            c: "American Psycho",
            d: "John Wick"
        },
        correctAnswer: "b"
    },
    {
        question: "Which of these films did Paul Thomas Anderson NOT direct?",
        answers: {
            a: "Boogie Nights",
            b: "Mulholland Drive",
            c: "Inherent Vice",
            d: "Phantom Thread"
        },
        correctAnswer: "b"
    },
    {
        question: "Who is the greatest actor of our generation?",
        answers: {
            a: "Ryan Gosling",
            b: "Michael Fassbender",
            c: "Not Ryan Reynolds",
            d: "Daniel Day Lewis"
        },
        correctAnswer: "c"
    },
    {
        question: "What painting does Norman Bates look under in 'Psycho'?",
        answers: {
            a: "Vénus consolant l'Amour (1751)",
            b: "Venus with a Mirror (1555)",
            c: "Fast Day (1812)",
            d: "Susannah and the Elders (1731)"
        },
        correctAnswer: "d"
    },
    {
        question: "David Lynch is most known for creating which television series?",
        answers: {
            a: "Wayward Pines",
            b: "Twin Peaks",
            c: "Room 104",
            d: "The X-Files"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the cat's name in 'Alien'?",
        answers: {
            a: "Jonesy",
            b: "Esther",
            c: "Baby",
            d: "Abbie"
        },
        correctAnswer: "a"
    },
];

// Logic for Quiz
function buildQuiz() {

    // Variable to store the HTML output
    let output = [];

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // Variable for list of answer choices
            let answers = [];

            for (letter in currentQuestion.answers) {

                // HTML radio button
                answers.push(
                    `<label>
           <input type="radio" name="question${questionNumber}" 
           value="${letter}">
           ${letter} :

           ${currentQuestion.answers[letter]}
         </label>`
                );
            }
            // Div to hold questions and answers
            output.push(
                `<div class=slide>
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        })

    // Joining our output list into one string of HTML and putting it on the page
    quizContainer.innerHTML = output.join("");
}

// Function for Results
function showResults() {
    // Gather answer container from our quiz
    let answerContainers = quizContainer.querySelectorAll('.answers');

    // Tracking user's answers
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {

        let answerContainer = answerContainers[questionNumber];
        let selector = 'input[name=question' + questionNumber + ']:checked';
        let userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;

            // Color correct
            answerContainers[questionNumber].style.color = 'navy';
        }
        // if answer is wrong or blank
        else {
            // Color incorrect
            answerContainers[questionNumber].style.color = 'red';
        }

    });

    // Show result in html 
    resultsContainer.innerHTML = 'TOTAL CORRECT: ' + numCorrect + ' out of ' +
        myQuestions.length;
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    if (currentSlide === 0) {
        previousButton.style.display = 'none';
    }
    else {
        previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}
function showNextSlide() {
    showSlide(currentSlide + 1);
}
function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

// Countdown timer
function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        let t = getTimeRemaining(endtime);

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            alert("TIME'S UP");
            showResults();
        }
    }

    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
}

let timeInMinutes = 1;
let currentTime = Date.parse(new Date());
let deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
initializeClock('clockdiv', deadline);

function stopTimer() {
    clearInterval(initializeClock);
    console.log(stopTimer);
}

// Me trying to get my timer to stop on submit
$('#submit').on('click', function() {
    console.log('submitted')
    stopTimer();
})

// Variables
let quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('results');
let submitButton = document.getElementById('submit');


// Display quiz 
buildQuiz();

// Pages
let previousButton = document.getElementById("previous");
let nextButton = document.getElementById("next");
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(0);

// When submitting answer, show result.
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);