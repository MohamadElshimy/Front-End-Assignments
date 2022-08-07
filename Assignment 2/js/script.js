// To be displayed on the status display depending on the scenario "In game, win, or draw"
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;

// Initializing the game status "Starting scenario"
let gameOver = false;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let statusDisplay = document.getElementById('status');
statusDisplay.innerHTML = currentPlayerTurn();

// Whether the array of 3 elements contains all "X"s or "O"s "All available eight winning situations"
const winningScenarios = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Player played over a cell logic "Drawing the letter, switching players turns, winning, or game draw"
function handlePlayerCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id')) - 1;
	console.log(clickedCellIndex);
	// Game over or trying to play over other player
    if (gameState[clickedCellIndex] !== "" || gameOver) {
        return;
    }
	// Draw the player letter
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    // Check for winning scenario
	for (let i = 0; i < 8; i++) {
        const winScenario = winningScenarios[i];
        let a = gameState[winScenario[0]];
        let b = gameState[winScenario[1]];
        let c = gameState[winScenario[2]];
        if (a!== '' && a === b && b === c) {
            gameOver = true;
            break
        }
    }
	// Player won situation
	if (gameOver) {
        statusDisplay.innerHTML = winningMessage();
        gameOver = true;
        return;
    }
	// Check for draw scenario
	let roundDraw = !gameState.includes("");
	// Draw situation
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameOver = true;
        return;
    }
	// Switching players turns
	currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Restart game logic "Resetting all variables to initial status"
function handleRestartGame() {
    gameOver = false;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Add action listeners for all the cells along with the restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handlePlayerCellClick));
document.getElementById('restart').addEventListener('click', handleRestartGame);