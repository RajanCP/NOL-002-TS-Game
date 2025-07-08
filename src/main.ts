import "./style.scss";


const displayParagraph = document.querySelector("#paragraph-display") as HTMLDivElement;
const inputParagraph = document.querySelector("#paragraph-input") as HTMLInputElement;

const sentences = ["This is dummy text to copy"];

displayParagraph.innerText = sentences[0];

