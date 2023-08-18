// Selecting both of player names and editing buttons
const player1Name = document.querySelector("#player1 h2");
const player1EditButtonElement = document.querySelector("#player1 button");
const player2Name = document.querySelector("#player2 h2");
const player2EditButtonElement = document.querySelector("#player2 button");

//Players Configurations overlay and input and both of cancel and confirm buttons
const playerConfigOverlay = document.getElementById("overlay");
const playerNameInputElement = document.querySelector("#overlay input");
const cancelButton = document.getElementById("cancel");
const confirmButton = document.getElementById("confirm");

//to show specific player name as default value when trying to configure first player name
function changePlayer1Name() {
  playerNameInputElement.value = player1Name.innerText; 
  playerNameInputElement.name = "player1name";
  playerConfigOverlay.style.display = "block";
}
player1EditButtonElement.addEventListener("click", changePlayer1Name);

//to show specific player name as default value when trying to configure second player name
function changePlayer2Name() {
  playerNameInputElement.value = player2Name.innerText;
  playerNameInputElement.name = "player2name";
  playerConfigOverlay.style.display = "block";
}
player2EditButtonElement.addEventListener("click", changePlayer2Name);


function closePlayerConfigOverlay() {
  playerConfigOverlay.style.display = "none";
}

cancelButton.addEventListener("click", closePlayerConfigOverlay);

//setting player name taking which player has pressed edit in respect
function setplayername() {
  if (playerNameInputElement.name == "player1name") {
    player1Name.innerText = playerNameInputElement.value;
  } else {
    player2Name.innerText = playerNameInputElement.value;
  }
  closePlayerConfigOverlay();
}
confirmButton.addEventListener("click", setplayername);

