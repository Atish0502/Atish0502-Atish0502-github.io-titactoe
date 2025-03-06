const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameBoard[index] !== '' || !isGameActive) return;

    // Update game state
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#d9534f' : '#337ab7'; // Color differentiation
    
    checkResult();
}

function checkResult() {
    let roundWon = false;
    let winningCombo = [];

    // Check for win
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            winningCombo = condition;
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        message.textContent = `Player ${currentPlayer} wins! 🎉`;
        highlightWinningCells(winningCombo);
        return;
    }

    // Check for draw
    if (!gameBoard.includes('')) {
        isGameActive = false;
        message.textContent = "Game ended in a draw! 🤝";
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCells(combo) {
    combo.forEach(index => {
        cells[index].style.backgroundColor = '#dff0d8'; // Winning highlight color
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;

    // Reset all cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
}

// Initialize game message
message.textContent = `Player ${currentPlayer}'s turn`;