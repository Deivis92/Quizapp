let questions = [
  {
    question: "Welches Land ist für seine Tulpen und Windmühlen bekannt?",
    answer_1: "a) Spanien",
    answer_2: "a) Italien",
    answer_3: "a) Niederlande",
    answer_4: "a) Frankreich",
    right_answer: 3,
  },
  {
    question: "Welches Land ist berühmt für die Pyramiden von Gizeh?",
    answer_1: "a) Griechenland",
    answer_2: "b) Ägypten",
    answer_3: "c) Mexiko",
    answer_4: "d) Indien",
    right_answer: 2,
  },
  {
    question:
      "In welcher Stadt befindet sich die berühmte Sehenswürdigkeit „Sagrada Familia“?",
    answer_1: "a) Paris",
    answer_2: "a) Madrid",
    answer_3: "a) Rom",
    answer_4: "a) Barcelona",
    right_answer: 4,
  },
  {
    question: "Welcher Fluss fließt durch London?",
    answer_1: "a) Seine",
    answer_2: "a) Rhein",
    answer_3: "a) Themse",
    answer_4: "a) Donau",
    right_answer: 3,
  },
  {
    question: "Wo befindet sich der Grand Canyon?",
    answer_1: "a) Kanada",
    answer_2: "b) Australien",
    answer_3: "c) USA",
    answer_4: "d) Brasilien",
    right_answer: 3,
  },
  {
    question: "In welcher Stadt befindet sich der berühmte Eiffelturm?",
    answer_1: "a) London",
    answer_2: "b) New York",
    answer_3: "c) Paris",
    answer_4: "d) Berlin",
    right_answer: 4,
  },
];

let rightQuestions = 0;
let currentQuestion = 0;
let audio_success = new Audio("sounds/success.wav"); // added sounds
let audio_fail = new Audio("sounds/fail.wav");


document.addEventListener('DOMContentLoaded', (event) => {
  init();
});

function init() {
  document.getElementById("allQuestions").innerHTML = questions.length;
  document.getElementById("ammountOfRightQuestions").innerHTML = rightQuestions;

  showStartScreen();

  showQuestion();
}

function showStartScreen() {
  document.querySelectorAll(".quizAnswerCard").forEach((card) => (card.style.display = "none"));
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("questionFooterId").style.display = "none"; // Hide the footer here
  document.getElementById("questionText").style.display = "none";
  document.getElementById("progressBarHidden").style.display = "none";
}
  


function startPush() {
  document.getElementById("welcomeScreen").style.display = "none";
  document
    .querySelectorAll(".quizAnswerCard")
    .forEach((card) => (card.style.display = "block"));
  document.getElementById("nextButton").style.display = "block";
  document.getElementById("questionFooterId").style.display = "block";
  document.getElementById("questionText").style.display = "block";
  document.getElementById("progressBarHidden").style.display = "block";
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    // show question
    functionUpdateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndScreen() {
  document.getElementById("endScreen").style.display = "block";
  document.getElementById("questionText").style.display = "none";
  document.querySelectorAll(".quizAnswerCard").forEach((card) => (card.style.display = "none"));
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("questionFooterId").style.display = "none";
  document.getElementById("ammountOfRightQuestions").innerHTML = rightQuestions;
  document.getElementById("ammountOfQuestions").innerHTML = questions.length;
}

function functionUpdateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progressBar").innerHTML = `${percent} %`;
  document.getElementById("progressBar").style = `width: ${percent}%`;
}

function updateToNextQuestion() {
  functionUpdateProgressBar();

  let question = questions[currentQuestion];

  document.getElementById("questionNumber").innerHTML = currentQuestion + 1; // zählen
  document.getElementById("questionText").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);

  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (rightAnswerSelected(selectedQuestionNumber, question)) {
    document.getElementById(selection).parentNode.classList.add("bg-success");
    audio_success.play();
    rightQuestions++;
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add("bg-success");
    audio_fail.play();
  }
  document.getElementById("nextButton").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
  return selectedQuestionNumber == question["right_answer"];
}

function nextQuestion() {
  currentQuestion++; // z.b von 0 auf 1
  document.getElementById("nextButton").disabled = true;
  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restart() {
  rightQuestions = 0;
  currentQuestion = 0;
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("questionText").style.display = "block";
  document
    .querySelectorAll(".quizAnswerCard")
    .forEach((card) => (card.style.display = "block"));
  document.getElementById("nextButton").style.display = "block";
  document.getElementById("questionFooterId").style.display = "block";
  startPush();
}

