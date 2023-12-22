const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#textAlert');
const restartBtn = document.querySelector('.button-23');
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;
let waitingForReset = false;

initializeGame();

function initializeGame() {
    cells.forEach((cell) => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Your turn!`;
    running = true;
    waitingForReset = false; // Ustaw flagę na początku gry
  }

  function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');
  
    if (options[cellIndex] !== '' || !running || waitingForReset) {
      return;
    }
  
    updateCell(this, cellIndex);
    checkWinner();
  
    if (running && currentPlayer === 'O') {
      setTimeout(() => {
        if (!waitingForReset) {
          mediumAI();
        }
      }, 1000);
    }
  }
  

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = currentPlayer === 'X' ? 'Your turn!' : "Medium AI's turn";
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const [cellA, cellB, cellC] = condition.map((index) => options[index]);

    if (cellA === '' || cellB === '' || cellC === '') {
      continue;
    }

    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = currentPlayer === 'X' ? 'You won!' : "Medium AI won!";
    running = false;
  } else if (!options.includes('')) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
    waitingForReset = true;
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `Your turn!`;
    cells.forEach((cell) => (cell.textContent = ''));
    running = true;
    setTimeout(() => {
      waitingForReset = false;
    }, 1000);
  }
  

function mediumAI() {
    if (waitingForReset) return;
    const availableMoves = [];
    let selectedMove = -1;
  
    for (let i = 0; i < options.length; i++) {
      if (options[i] === '') {
        availableMoves.push(i);
      }
    }
  
    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const [cellA, cellB, cellC] = condition.map((index) => options[index]);
  
      // Sprawdź, czy AI ma szansę na zwycięstwo
      if ((cellA === 'O' && cellB === 'O' && cellC === '') ||
          (cellA === 'O' && cellB === '' && cellC === 'O') ||
          (cellA === '' && cellB === 'O' && cellC === 'O')) {
        for (let j = 0; j < condition.length; j++) {
          if (options[condition[j]] === '') {
            selectedMove = condition[j];
            break;
          }
        }
      }
    }
  
    if (selectedMove === -1) {
      // Jeśli AI nie ma szansy na zwycięstwo, sprawdź, czy musi zablokować gracza
      for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const [cellA, cellB, cellC] = condition.map((index) => options[index]);
  
        // Sprawdź, czy gracz ma szansę na zwycięstwo w następnej turze
        if ((cellA === 'X' && cellB === 'X' && cellC === '') ||
            (cellA === 'X' && cellB === '' && cellC === 'X') ||
            (cellA === '' && cellB === 'X' && cellC === 'X')) {
          for (let j = 0; j < condition.length; j++) {
            if (options[condition[j]] === '') {
              selectedMove = condition[j];
              break;
            }
          }
        }
      }
    }
  
    if (selectedMove === -1 && availableMoves.length > 0) {
      // Jeśli nie ma zwycięskiego lub blokującego ruchu, wybierz losowy dostępny ruch
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      selectedMove = availableMoves[randomIndex];
    }
  
    if (selectedMove !== -1) {
      updateCell(cells[selectedMove], selectedMove);
      checkWinner();
    }
  }
  
