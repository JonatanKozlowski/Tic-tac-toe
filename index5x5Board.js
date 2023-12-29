const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#textAlert");
const restartBtn = document.querySelector(".button-23");
const gridSize = 5; // Set the grid size to 5x5
const figuresInLineToWin = 4; // Set figures in line to win to 4
const winConditions = generateWinConditions(gridSize, figuresInLineToWin);
let options = new Array(gridSize * gridSize).fill(""); // Use the grid size to create options array
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => cellClicked(index));
        cell.setAttribute("cellIndex", index);
    });
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(cellIndex) {
    if (options[cellIndex] !== "" || !running) {
        return;
    }
    updateCell(cells[cellIndex], cellIndex);
    checkWinner();
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

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        let count = 0;
        let previousFigure = "";

        for (let j = 0; j < condition.length; j++) {
            const cellIndex = condition[j];
            const currentFigure = options[cellIndex];

            if (currentFigure === previousFigure && currentFigure !== "") {
                count++;
                if (count === figuresInLineToWin - 1) {
                    roundWon = true;
                    break;
                }
            } else {
                count = 0;
            }
            previousFigure = currentFigure;
        }

        if (roundWon) {
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = new Array(gridSize * gridSize).fill("");
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach((cell) => (cell.textContent = ""));
    running = true;
}

function generateWinConditions(size, figuresToWin) {
    const winConditions = [];

    // Rows and Columns
    for (let i = 0; i < size; i++) {
        for (let j = 0; j <= size - figuresToWin; j++) {
            const row = [];
            const col = [];
            for (let k = 0; k < figuresToWin; k++) {
                row.push(i * size + j + k);
                col.push(j * size + i + k * size);
            }
            winConditions.push(row, col);
        }
    }

    // Diagonals
    for (let i = 0; i <= size - figuresToWin; i++) {
        for (let j = 0; j <= size - figuresToWin; j++) {
            const diagonal1 = [];
            const diagonal2 = [];
            for (let k = 0; k < figuresToWin; k++) {
                diagonal1.push((i + k) * size + j + k);
                diagonal2.push((i + k) * size + j + figuresToWin - 1 - k);
            }
            winConditions.push(diagonal1, diagonal2);
        }
    }

    return winConditions;
}
