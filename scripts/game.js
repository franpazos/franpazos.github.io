function startGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please enter both player names to start the game.");
    return;
  }

  resetGame();

  activePlayerName.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (
    event.target.tagName !== "LI" ||
    event.target.classList.contains("disabled") || // only need this line if we're using event delegation
    gameIsOver
  ) {
    return;
  }

  const selectedField = event.target;

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkWinner();

  if (winnerId !== 0) {
    gameOver(winnerId);
    return;
  }

  currentRound++;
  switchPlayer();
}

function checkWinner() {
  // Check rows
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[i][0] !== 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][0] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Check columns
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[0][i] !== 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Check diagonals
  if (
    gameData[0][0] !== 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[0][0] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    gameData[0][2] !== 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[0][2] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  if (currentRound === 9) {
    return -1; // Draw
  }

  return 0; // No winner yet
}

function gameOver(winnerId) {
  gameIsOver = true;  
  gameOverOverlay.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverOverlay.firstElementChild.firstElementChild.textContent = winnerName;
    console.log(winnerName);
  } else {
    gameOverOverlay.firstElementChild.textContent = "It's a draw!";
  }
}

function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverOverlay.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER</span>!';  
  gameOverOverlay.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItem = gameBoard.children[gameBoardIndex];
      gameBoardItem.textContent = '';
      gameBoardItem.classList.remove("disabled");
      gameBoardIndex++;
    }
  }

}
