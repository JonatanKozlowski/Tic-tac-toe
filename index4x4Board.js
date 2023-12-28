const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#textAlert");
const restartBtn = document.querySelector(".button-23");
const winConditions = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
    [0, 1, 4, 5],
    [1, 2, 5, 6],
    [2, 3, 6, 7],
    [4, 5, 8, 9],
    [5, 6, 9, 10],
    [6, 7, 10, 11],
    [8, 9, 12, 13],
    [9, 10, 13, 14],
    [10, 11, 14, 15],
    [0, 1, 2, 6],
    [1, 2, 3, 7],
    [4, 5, 6, 10],
    [5, 6, 7, 11],
    [8, 9, 10, 14],
    [9, 10, 11, 15],
    [0, 5, 10, 14],
    [3, 6, 9, 13]
];
let options = Array.from({ length: 16 }, () => "");
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = parseInt(this.getAttribute("cellIndex"));

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

    // If the game is still running, it's the computer's turn
    if (running) {
        computerMove();
        checkWinner();
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (const condition of winConditions) {
        const cellsInCondition = condition.map(index => options[index]);

        if (cellsInCondition.every(cell => cell === currentPlayer)) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = Array.from({ length: 16 }, () => "");
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => (cell.textContent = ""));
    running = true;

    // If the computer starts, make the first move
    if (computerPlayer === "X") {
        computerMove();
        checkWinner();
    }
}

function computerMove() {
    const bestMove = getBestMove();
    if (bestMove !== null) {
        const cell = cells[bestMove];
        updateCell(cell, bestMove);
        changePlayer();
    }
}

function getBestMove() {
    // Minimax algorithm for finding the best move
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < options.length; i++) {
        if (options[i] === "") {
            options[i] = computerPlayer;
            const score = minimax(options, 0, false);
            options[i] = ""; // Undo the move

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    const scores = {
        X: -1,
        O: 1,
        tie: 0
    };

    const result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = computerPlayer;
                const score = minimax(board, depth + 1, false);
                board[i] = ""; // Undo the move
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = currentPlayer;
                const score = minimax(board, depth + 1, true);
                board[i] = ""; // Undo the move
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
