import "./style.scss";
import { setupStartScreen } from "./startscreen";
import { easySentences, mediumSentences, hardSentences } from "./sentences";


const displayParagraph = document.querySelector("#paragraph-display") as HTMLDivElement;
const inputParagraph = document.querySelector("#paragraph-input") as HTMLTextAreaElement;
const newParaBtn = document.querySelector("#new-paragraph") as HTMLButtonElement;
const difficultySelect = document.querySelector("#difficulty-select") as HTMLSelectElement;

setupStartScreen(initGame);

let currentSentence = "";
let correctCount = 0;
let anyIncorrect = false;

// Maps to pick difficulty level and time left based on user choice

const difficultyTimeMap = new Map<string, number>([
  ["easy", 40],
  ["medium", 30],
  ["hard", 25],
]);

const difficultySentenceMap = new Map<string, string[]>([
  ["easy", easySentences],
  ["medium", mediumSentences],
  ["hard", hardSentences],
]);

function initGame() {
  clearInterval(timerInterval);
  timerStarted = false;
  correctCount = 0;
  anyIncorrect = false;

  const currentDifficulty = difficultySelect.value;

  timeLeft = difficultyTimeMap.get(currentDifficulty) ?? 30;

  const sentencePool = difficultySentenceMap.get(currentDifficulty) ?? mediumSentences;
  const randomIndex = Math.floor(Math.random() * sentencePool.length);
  currentSentence = sentencePool[randomIndex];
  displayParagraph.innerText = currentSentence;

  inputParagraph.value = "";
  inputParagraph.disabled = false;
  inputParagraph.classList.remove("typing-game__input--incorrectborder");

  const accuracyValue = document.getElementById("accuracy-value") as HTMLSpanElement;
  accuracyValue.textContent = "";
  accuracyValue.className = "typing-game__accuracy-value";

  const endMessage = document.getElementById("result") as HTMLDivElement;
  endMessage.innerText = "";

  const timerValue = document.getElementById("timer-value") as HTMLSpanElement;
  timerValue.textContent = `${timeLeft}s`;
  timerValue.style.color = "green";
  
  inputParagraph.focus()
}

// checkParagraph function

const checkParagraph = (inputParagraph: string) => {
  const displayText = currentSentence;
  anyIncorrect = false;

  correctCount = 0;
  displayParagraph.innerText = " ";

  for (let i = 0; i < displayText.length; i++) {
    const displayChar = displayText[i];
    const inputChar = inputParagraph[i];

    // Creating span and logic to target individual styling

    const span = document.createElement("span");
    const textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    span.innerText = displayChar;

    if (inputChar == null) {
      span.classList.remove("typing-game__input--incorrect");
      span.classList.remove("typing-game__input--correct");
    } else {
      if (displayChar == inputChar) {
        span.classList.add("typing-game__input--correct");
        correctCount++;
      } else {
        span.classList.add("typing-game__input--incorrect");
        anyIncorrect = true;
      }
    }

    displayParagraph.append(span);

    // Logic for border styling

    if (anyIncorrect) {
      textArea.classList.add("typing-game__input--incorrectborder");
    } else {
      textArea.classList.remove("typing-game__input--incorrectborder");
    }
  }
};

// checkAccuracy function

const checkAccuracy = (correctCount: number, inputParagraph: HTMLTextAreaElement) => {
  const accuracyValue = document.getElementById("accuracy-value") as HTMLSpanElement;

  if (inputParagraph.value.length === 0) {
    accuracyValue.textContent = "";
  } else {
    const accuracy = Math.floor((correctCount / inputParagraph.value.length) * 100);
    accuracyValue.textContent = `${accuracy}%`;

    // Apply styles based on the calculated accuracy value

    accuracyValue.classList.remove("typing-game__accuracy-value--low", "typing-game__accuracy-value--medium", "typing-game__accuracy-value--high");

    if (accuracy < 50) {
      accuracyValue.classList.add("typing-game__accuracy-value--low");
    } else if (accuracy < 90) {
      accuracyValue.classList.add("typing-game__accuracy-value--medium");
    } else {
      accuracyValue.classList.add("typing-game__accuracy-value--high");
    }
  }
};

// End game

const endGame = (message: string) => {
  const endMessage = document.getElementById("result") as HTMLDivElement;
  endMessage.innerText = message;
  inputParagraph.disabled = true;
};

// Start Timer

let timeLeft = 30;
let timerStarted = false;
let timerInterval: number; // To store interval ID

const startTimer = () => {
  if (timerStarted) return;

  timerStarted = true;

  timerInterval = setInterval(() => {
    // setInterval does not need to be called multiple times, it runs continiously until you call clearInterval with the interval ID
    timeLeft--;
    const timerValue = document.getElementById("timer-value") as HTMLSpanElement;

    timerValue.textContent = `${timeLeft}s`;

    if (timeLeft <= 10) {
      timerValue.style.color = "red";
    } else if (timeLeft <= 20) {
      timerValue.style.color = "orange";
    } else {
      timerValue.style.color = "green";
    }

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      endGame("Time's up!");
    }
  }, 1000);
};

// Event Handler - function that is called in response to input event

const handleInput = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;

  startTimer();

  // Check if inputParagraph matches displayParagraph, end game
  if (value === currentSentence && !anyIncorrect) {
    endGame("Well done!");
    clearInterval(timerInterval);
  }
  checkParagraph(value);
  checkAccuracy(correctCount, inputParagraph);
};

// Event Listener added on user input to inputParagraph textarea element

inputParagraph.addEventListener("input", handleInput);

newParaBtn.addEventListener("click", initGame);
initGame();

difficultySelect.addEventListener("change", initGame);

