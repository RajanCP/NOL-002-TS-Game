export function setupStartScreen(startCallback: () => void) {
  const startScreen = document.querySelector("#start-screen") as HTMLDivElement;
  const gameContainer = document.querySelector("#game-container") as HTMLDivElement;
  const startButton = document.querySelector("#start-button") as HTMLButtonElement;

  startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameContainer.classList.remove("typing-game--blurred");
    startCallback();
  });
}
