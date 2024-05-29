const gameData = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
]

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
	{
		name: "",
		symbol: "X"	
	},
	{
		name: "",
		symbol: "O"
	}
];

const playerConfigOverlay = document.getElementById('config-overlay');
const backdrop = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const errorsOutput = document.getElementById('config-errors');
const gameArea = document.getElementById('active-game');
const activePlayerName = document.getElementById('active-player-name');
const gameOverOverlay = document.getElementById('game-over');
const winnerNameElement = document.getElementById('winner-name');

const editPlayer1 = document.getElementById('edit-player1-btn');
const editPlayer2 = document.getElementById('edit-player2-btn');
const cancelConfigBtn = document.getElementById('cancel-config-btn');
const confirmConfigBtn = document.getElementById('confirm-config-btn');
const startGameBtn = document.getElementById('start-game-btn');
// const gameFieldElements = document.querySelectorAll('#game-board li');
const gameBoard = document.getElementById('game-board');  // Same as above, but we're selecting the parent element

editPlayer1.addEventListener("click", openPlayerConfig);
editPlayer2.addEventListener('click', openPlayerConfig);

cancelConfigBtn.addEventListener('click', closePlayerConfig);
backdrop.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

startGameBtn.addEventListener('click', startGame);

// for (const gameField of gameFieldElements) {
// 	gameField.addEventListener('click', selectGameField);
// }

gameBoard.addEventListener('click', selectGameField);  // same as above, but we're using event delegation