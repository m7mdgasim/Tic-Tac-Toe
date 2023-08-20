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

// Closing the configuring overlay with no changes
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
const gamePlaces = document.querySelectorAll(".game-place");

const startButtonElement = document.getElementById("start");
const gamePlayground = document.getElementById("gameplay");

const whosTurnIsIt = document.querySelector("#gameplay p");

let player1score = 0;
let player2score = 0;

function resetGamePlayground() {
  for (place of gamePlaces) {
    place.classList.remove("played");
    place.innerText = "";
    whosTurnIsIt.innerHTML =
      'Start <strong id="player-turn">' + player1Name.innerText + "</strong>";
    turn = "playerX";
    turnNumber = 0;
  }
  playgroundMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
}

// Starting the gamme with showing the playground and changing the button to reset and reseting players score
function startGame() {
  gamePlayground.style.display = "block";
  startButtonElement.innerHTML = '<a href="#gameplay">Reset The Game Board</a>';
  startButtonElement.removeEventListener("click", startGame);
  startButtonElement.addEventListener("click", resetGamePlayground);
  whosTurnIsIt.innerHTML =
  'Start <strong id="player-turn">' + player1Name.innerText + "</strong>";
  player1score = 0;
  player2score = 0;
}
startButtonElement.addEventListener("click", startGame);



// winner decider and score adder
const winParagaphElement = document.getElementById('win');

function playerWin(playerTurn) {
  player1ResultElement.innerText = player1Name.innerText;
  player2ResultElement.innerText = player2Name.innerText;
  if (playerTurn == "playerX" ){
    winParagaphElement.innerHTML= 'You Won, ' + player1Name.innerText;
    player1score = player1score + 1;
  } else {
    winParagaphElement.innerHTML= 'You Won, ' + player2Name.innerText;
    player2score = player2score + 1;
  }

resultBoardElement.innerText = player1score + " : " + player2score;
gameResults.style.display = "block";
}


function draw(){
  winParagaphElement.innerHTML = `What A Match! Ended With <span style='text-decoration: underline
  '>Draw</span>, Scores Stay The Same`;
  player1ResultElement.innerText = player1Name.innerText;
  player2ResultElement.innerText = player2Name.innerText;
  resultBoardElement.innerText = player1score + " : " + player2score;
  gameResults.style.display = "block";
}


// To Check if there is a winner
function checkWin(matrix, turn) {
  let countingArray =[0,1,2]
  //draw checking
  if (turnNumber == 9){
    draw();
  }
  // Vertical Checking
  for (j of countingArray) {
    let array = [];
    for (i of countingArray) {
      array.push(matrix[i][j]);
    }
    if (new Set(array).size === 1) {
      playerWin(turn);
    }
  }
  // Horizental Checking
  for (i of countingArray) {
    let array = [];
    for (j of countingArray) {
      array.push(matrix[i][j]);
    }
    if (new Set(array).size === 1) {
      playerWin(turn);
    }
  }
  // main diagonal checking
  let array = [];
  for (i of countingArray) {
    array.push(matrix[i][i]);
  }
  if (new Set(array).size === 1) {
    playerWin(turn);
  }
  // second diagonal checking
  array = [matrix[0][2], matrix[1][1], matrix[2][0]];
  if (new Set(array).size === 1) {
    playerWin(turn);
  }
}


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

let turn = "playerX";

// turn-based gameplay
let turnNumber = 0;
  for (place of gamePlaces) {
  function played(event) {
    event.target.classList.add("played"); //add style of played place
    let notOccupied = event.target.innerText == "";
    // checking if the place occupied or not then decide to change the place
    if (notOccupied) {
      turnNumber++;
      console.log(turnNumber)
      if (turn == "playerX") {
        let placeNumber = event.target.id; //check which place is it
        addingToMatrix(placeNumber, turn);  
        event.target.innerText = "X"; //add X to selected place
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
      whosTurnIsIt.innerHTML =
          `This is an <strong id="player-turn"> 
          an occupied place, 
          </strong> Choose another place`;
    }
  }

  place.addEventListener("click", played);
}


// //GAME RESULTS
// showing players names in result
const player1ResultElement = document.getElementById("player-x");
const player2ResultElement = document.getElementById("player-o");
const gameResults = document.getElementById("game-result");


const resultBoardElement = document.getElementById("result");

const rematchButton = document.getElementById("rematch");

function rematch() {
  resetGamePlayground();
  gameResults.style.display = "none";
}

rematchButton.addEventListener("click", rematch);
