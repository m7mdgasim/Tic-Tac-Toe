// //PLAYER NAME COFIGURATION FEATURE

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

// //GAMEPLAY FEATURE

//START AND RESTART
let gameStatus = "notStarted";
const gamePlaces = document.querySelectorAll(".game-place");

const startButtonElement = document.getElementById("start");
const gamePlayground = document.getElementById("gameplay");

const whosTurnIsIt = document.querySelector("#gameplay p");

function resetGamePlayground() {
  for (place of gamePlaces) {
    place.classList.remove("played");
    place.innerText = "";
    whosTurnIsIt.innerHTML =
      'Start <strong id="player-turn">' + player1Name.innerText + "</strong>";
    turn = "playerX";
  }
  playgroundMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
}

function startGame() {
  gamePlayground.style.display = "block";
  startButtonElement.innerHTML = '<a href="#gameplay">Reset The Game Board</a>';
  gameStatus = "started";
  startButtonElement.removeEventListener("click", startGame);
  startButtonElement.addEventListener("click", resetGamePlayground);
}

startButtonElement.addEventListener("click", startGame);

let playgroundMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// adding the played place to the playground matrix to use it later to check if there is a winner
function addingToMatrix(placeNumber, player) {
  for (i in playgroundMatrix) {
    for (j in playgroundMatrix[i]) {
      if (placeNumber == playgroundMatrix[i][j]) {
        if (player == "playerX") {
          playgroundMatrix[i][j] = "x";
        } else {
          playgroundMatrix[i][j] = "o";
        }
      }
    }
  }
}

// To Check if there is a winner
function checkWin(matrix, turn) {
  for (j of [0, 1, 2]) {
    let array = [];
    for (i of [0, 1, 2]) {
      array.push(matrix[i][j]);
    }
    if (new Set(array).size === 1) {
      console.log("We Have A Winner! in column " + j + " congrats " + turn);
    }
  }
  for (i of [0, 1, 2]) {
    let array = [];
    for (j of [0, 1, 2]) {
      array.push(matrix[i][j]);
    }
    if (new Set(array).size === 1) {
      console.log("We Have A Winner! in row " + i + " congrats " + turn);
    }
  }
  let array = [];
  for (i of [0, 1, 2]) {
    array.push(matrix[i][i]);
  }
  if (new Set(array).size === 1) {
    console.log("We Have A Winner! in  the main diagonal, congrats " + turn);
  }
  array = [matrix[0][2], matrix[1][1], matrix[2][0]];
  if (new Set(array).size === 1) {
    console.log("We Have A Winner! in  the secondary diagonal, congrats " + turn);
  }
}

whosTurnIsIt.innerHTML =
  'Start <strong id="player-turn">' + player1Name.innerText + "</strong>";

let turn = "playerX";

// turn-based gameplay
for (place of gamePlaces) {
  function played(event) {
    event.target.classList.add("played");
    let notOccupied = event.target.innerText == "";

    // checking if the place occupied or not then decide to change the place
    if (notOccupied) {
      if (turn == "playerX") {
        let placeNumber = event.target.id;
        addingToMatrix(placeNumber, turn);
        event.target.innerText = "X";
        checkWin(playgroundMatrix, turn);

        turn = "playerO";

        whosTurnIsIt.innerHTML =
          `It's <strong id="player-turn">` +
          player2Name.innerText +
          " </strong> turn";
      } else {
        let placeNumber = event.target.id;
        addingToMatrix(placeNumber, turn);
        event.target.innerText = "O";
        checkWin(playgroundMatrix, turn);

        turn = "playerX";

        whosTurnIsIt.innerHTML =
          `It's <strong id="player-turn">` +
          player1Name.innerText +
          " </strong> turn";
      }
    } else {
    }
  }

  place.addEventListener("click", played);
}
