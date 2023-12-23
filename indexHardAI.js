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
let waitingForAI = false;

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
  
    if (options[cellIndex] !== '' || !running || waitingForReset || waitingForAI) {
      return;
    }
  
    updateCell(this, cellIndex);
    checkWinner();
  
    if (running && currentPlayer === 'O') {
      waitingForAI = true; // Blokowanie kliknięć podczas tury AI
      setTimeout(() => {
        if (!waitingForReset) {
          hardAI();
          waitingForAI = false; // Odblokowanie kliknięć po zakończeniu tury AI
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
  statusText.textContent = currentPlayer === 'X' ? 'Your turn!' : "Hard AI's turn";
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
    statusText.textContent = currentPlayer === 'X' ? 'You won!' : "Hard AI won!";
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
  

  function hardAI() {
    if (waitingForReset) return;
    
    let bestScore = -Infinity;
    let move = null;
    
    for (let i = 0; i < options.length; i++) {
      if (options[i] === '') {
        options[i] = 'O';
        const score = minimax(options, 0, false);
        options[i] = '';
        
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    
    if (move !== null) {
      updateCell(cells[move], move);
      checkWinner();
    }
  }
  
  function minimax(board, depth, isMaximizing) {
    const result = checkResult(board);
    if (result !== null) {
      if (result === 'O') {
        return 10 - depth;
      } else if (result === 'X') {
        return depth - 10;
      } else {
        return 0;
      }
    }
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }
  
  function checkResult(board) {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    
    if (!board.includes('')) return 'draw';
    
    return null;
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
  
  
