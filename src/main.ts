import "./style.scss";

const displayParagraph = document.querySelector("#paragraph-display") as HTMLDivElement;
const inputParagraph = document.querySelector("#paragraph-input") as HTMLInputElement;

const sentences = ["This is dummy text to copy"];

displayParagraph.innerText = sentences[0];

const checkParagraph = (inputParagraph: string) => {
  const displayText = sentences[0];

  displayParagraph.innerText= " "

  for (let i = 0; i < displayText.length; i++) {
    const displayChar = displayText[i];
    const inputChar = inputParagraph[i];

    // Creating span for each character to target individual styling

    const span = document.createElement("span");
    span.innerText = displayChar;

    if (displayChar == inputChar) {
      span.classList.add("correct");
      displayParagraph.append(span);
    } else {
      span.classList.add("incorrect");
      displayParagraph.append(span);
    }
  }
};

const handleInput = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  checkParagraph(value);
};

inputParagraph.addEventListener("input", handleInput);


