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

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Your turn!`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
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
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Your turn!`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
function mediumAI() {
    // Sprawdź dostępne puste pola
    const availableMoves = [];

    for (let i = 0; i < options.length; i++) {
        if (options[i] === "") {
            availableMoves.push(i);
        }
    }

    // Wybierz ruch na podstawie heurystyki
    let selectedMove = -1;

    // Sprawdź możliwe zwycięskie ruchy
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // Sprawdź czy AI ma możliwość wygranej
        if ((cellA === 'O' && cellB === 'O' && cellC === '') ||
            (cellA === 'O' && cellB === '' && cellC === 'O') ||
            (cellA === '' && cellB === 'O' && cellC === 'O')) {
            // Znaleziono możliwy zwycięski ruch, wybierz go
            for (let j = 0; j < condition.length; j++) {
                if (options[condition[j]] === '') {
                    selectedMove = condition[j];
                    break;
                }
            }
        }
    }

    // Jeśli nie ma potencjalnie zwycięskiego ruchu, wybierz losowy dostępny ruch
    if (selectedMove === -1 && availableMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        selectedMove = availableMoves[randomIndex];
    }

    // Wykonaj ruch AI
    if (selectedMove !== -1) {
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
        setTimeout(() => {
            mediumAI();
        }, 1000); // Opóźnienie 2 sekund przed wykonaniem ruchu AI
    }
}
 