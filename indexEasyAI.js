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
let aiMovePending = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Your turn!`;
    running = true;
}
function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if (options[cellIndex] !== '' || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

    if (running && currentPlayer === 'O') {
        aiMovePending = true; 
        setTimeout(() => {
            if (aiMovePending) {
                easyAI();
                aiMovePending = false; 
            }
        }, 1000);
    }
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    if(currentPlayer === "X"){
    statusText.textContent = `Your turn!`;
    }else{
    statusText.textContent = "EasyAI's turn";
    }
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        if(currentPlayer === "X"){
        statusText.textContent = `You won!`;
        }else{
            statusText.textContent = 'Easy AI won!';
        }
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame() {
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = 'Your turn!';
    cells.forEach((cell) => (cell.textContent = ''));
    running = true;

    
    aiMovePending = false;
}

function easyAI() {
    const availableMoves = [];

    for (let i = 0; i < options.length; i++) {
        if (options[i] === '') {
            availableMoves.push(i);
        }
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const selectedMove = availableMoves[randomIndex];

    if (availableMoves.length > 0) {
        updateCell(cells[selectedMove], selectedMove);
        checkWinner();
    }
}
function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if (options[cellIndex] !== '' || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

    if (running && currentPlayer === 'O') {
        aiMovePending = true; 
        setTimeout(() => {
            if (aiMovePending) {
                const availableMoves = [];

                for (let i = 0; i < options.length; i++) {
                    if (options[i] === '') {
                        availableMoves.push(i);
                    }
                }

                const randomIndex = Math.floor(Math.random() * availableMoves.length);
                const selectedMove = availableMoves[randomIndex];

                if (availableMoves.length > 0) {
                    updateCell(cells[selectedMove], selectedMove);
                    checkWinner();
                    aiMovePending = false;
                }
            }
        }, 1000);
    }
}
