const player1EditButtonElement = document.querySelector("#player1 button");
const player2EditButtonElement = document.querySelector("#player2 button");

const playerConfigOverlay = document.getElementById("overlay");
const cancelButton = document.getElementById("cancel");

function changePlayer1Name() {
  playerConfigOverlay.style.display = "block";
}

player1EditButtonElement.addEventListener("click", changePlayer1Name);

function changePlayer2Name() {
  playerConfigOverlay.style.display = "block";
}

player2EditButtonElement.addEventListener("click", changePlayer2Name);

function closePlayerConfigOverlay() {
  playerConfigOverlay.style.display = "none";
}

cancelButton.addEventListener("click", closePlayerConfigOverlay);
