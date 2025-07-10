import "./style.scss";

const displayParagraph = document.querySelector("#paragraph-display") as HTMLDivElement;
const inputParagraph = document.querySelector("#paragraph-input") as HTMLTextAreaElement;

const sentences = ["This is dummy text to copy"];

displayParagraph.innerText = sentences[0];

let correctCount = 0;
let anyIncorrect = false;

// checkParagraph function

const checkParagraph = (inputParagraph: string) => {
  const displayText = sentences[0];
  anyIncorrect = false;

  correctCount = 0;
  displayParagraph.innerText = " ";

  for (let i = 0; i < displayText.length; i++) {
    const displayChar = displayText[i];
    const inputChar = inputParagraph[i];

    // Creating span for each character to target individual styling

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

// Event listeners for inputParagraph textarea element

const handleInput = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  // const length = (e.target as HTMLTextAreaElement).textLength
  checkParagraph(value);
  checkAccuracy(correctCount, inputParagraph);
};

inputParagraph.addEventListener("input", handleInput);
