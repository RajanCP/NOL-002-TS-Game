import "./style.scss";

const displayParagraph = document.querySelector("#paragraph-display") as HTMLDivElement;
const inputParagraph = document.querySelector("#paragraph-input") as HTMLTextAreaElement;
const accuracyText = document.querySelector("#accuracy-value") as HTMLSpanElement;

const sentences = ["This is dummy text to copy"];

displayParagraph.innerText = sentences[0];

let correctCount = 0;

// checkParagraph function

const checkParagraph = (inputParagraph: string) => {
  const displayText = sentences[0];

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
        textArea.classList.remove("testborder");
        correctCount++;
        console.log(correctCount);
      } else {
        span.classList.add("incorrect");
        textArea.classList.add("testborder");
      }
    }

    displayParagraph.append(span);
  }
};

// checkParagraph function

const checkAccuracy = (correctCount: number, inputParagraph: HTMLTextAreaElement) => {
  if (inputParagraph.value.length === 0) {
    accuracyText.textContent = "";
  } else {
    const accuracy = Math.floor((correctCount / inputParagraph.value.length) * 100) + "%";
    accuracyText.textContent = accuracy;
  }
};

// Event listeners for inputParagraph textarea element which will call checkParagraph and checkAccuracy functions

const handleInput = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  // const length = (e.target as HTMLTextAreaElement).textLength
  checkParagraph(value);
  checkAccuracy(correctCount, inputParagraph);
};

inputParagraph.addEventListener("input", handleInput);
