const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#textAlert");
const restartBtn = document.querySelector(".button-23");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let waitingForAI = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Your turn!`;
    running = true;
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = (currentPlayer === "X") ? `Your turn!` : "EasyAI's turn";
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition.map(index => options[index]);
        if (a !== "" && a === b && b === c) {
            statusText.textContent = (currentPlayer === "X") ? "You won!" : "Easy AI won!";
            running = false;
            return;
        }
    }

    if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = 'Your turn!';
    cells.forEach(cell => cell.textContent = '');
    running = true;
}

function easyAI() {
    const availableMoves = options.reduce((moves, value, index) => {
        if (value === '') moves.push(index);
        return moves;
    }, []);

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const selectedMove = availableMoves[randomIndex];

    if (availableMoves.length > 0) {
        updateCell(cells[selectedMove], selectedMove);
    }
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if (options[cellIndex] !== '' || !running || waitingForAI) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

    if (running && currentPlayer === 'O') {
        waitingForAI = true;
        setTimeout(() => {
            if (waitingForAI) {
                easyAI();
                waitingForAI = false;
                checkWinner();
            }
        }, 1000);
    }
}
