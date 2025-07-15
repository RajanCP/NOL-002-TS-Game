import "./style.scss";

const displayParagraph = document.querySelector("#paragraph-display") as HTMLDivElement;
const inputParagraph = document.querySelector("#paragraph-input") as HTMLTextAreaElement;

const sentences = [
  "Writing clean, readable code not only helps machines interpret logic efficiently but also allows developers to maintain, debug, and scale applications more effectively over time.",

  "Debugging can feel overwhelming at first, but it’s a valuable skill that teaches you how systems behave under pressure and how to fix unexpected issues.",

  "Every experienced developer started as a beginner, making mistakes, learning from failure, and gradually building their skills through practice, curiosity, and persistence over time.",

  "Comments in your code should explain the reasoning behind complex logic, clarify intentions, and help others quickly understand what your function or component is doing.",

  "Practicing small coding projects daily reinforces problem-solving techniques, builds confidence in language syntax, and improves your ability to break complex problems into smaller parts.",

  "Understanding how data flows through each part of your program makes it easier to debug, optimize performance, and prevent common logic and memory-related errors.",

  "Version control tools like Git enable developers to experiment freely, track changes over time, and collaborate safely with teams without overwriting or losing valuable progress.",

  "Readable code is often better than clever one-liners, because teams need to understand and maintain it long after the original developer has moved on.",

  "Thorough testing of your code helps detect bugs early, reduces technical debt, and ensures that new changes don’t unintentionally break existing functionality or edge cases.",

  "Learning algorithms trains your brain to think logically, optimize performance, and structure your programs in ways that solve problems efficiently with clear, maintainable logic.",
];

const randomIndex = Math.floor(Math.random() * sentences.length);
const currentSentence = sentences[randomIndex];

displayParagraph.innerText = currentSentence;

let correctCount = 0;
let anyIncorrect = false;

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
      span.classList.remove("incorrect");
      span.classList.remove("correct");
    } else {
      if (displayChar == inputChar) {
        span.classList.add("correct");
        correctCount++;
      } else {
        span.classList.add("incorrect");
        anyIncorrect = true;
      }
    }

    displayParagraph.append(span);

    console.log(`Checking: ${displayChar} vs ${inputChar}`);
    console.log(`anyIncorrect: ${anyIncorrect}`);

    // Logic for border styling

    if (anyIncorrect) {
      textArea.classList.add("incorrectborder");
    } else {
      textArea.classList.remove("incorrectborder");
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

    accuracyValue.classList.remove("low", "medium", "high");

    if (accuracy < 50) {
      accuracyValue.classList.add("low");
    } else if (accuracy < 90) {
      accuracyValue.classList.add("medium");
    } else {
      accuracyValue.classList.add("high");
    }
  }
};

// End game

const endGame = (message: string) => {
  const endMessage = document.getElementById("result") as HTMLDivElement;

  endMessage.innerText = message;
  inputParagraph.disabled = true;
  setTimeout(() => {
    location.reload();
  }, 4000);
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
    const timerDisplay = document.getElementById("timer-display") as HTMLSpanElement;

    timerDisplay.textContent = `Time Remaining: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      endGame("Time's up! Better luck next time!");
    }
  }, 1000);
};

// Event Handler - function that is called in response to input event

const handleInput = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;

  startTimer();

  // Check if inputParagraph matches displayParagraph, end game
  if (value === currentSentence && !anyIncorrect) {
    endGame("You got lucky... Try the next one!");
  }
  checkParagraph(value);
  checkAccuracy(correctCount, inputParagraph);
};

// Event Listener added on user input to inputParagraph textarea element

inputParagraph.addEventListener("input", handleInput);
