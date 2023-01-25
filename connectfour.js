const width = 7;
const height = 6;

let currPlayer = 1;
let board = [];

function createBoard() {
    for (let y= 0; y < height; y++) {
        board.push(Array.from({length: width}));
    }
}

function htmlBoard() {
    const board = document.getElementById('table');

const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (let x = 0; x < width; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);
  
  for (let y = 0; y < width; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < height; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
}
function findSpotForCol(x) {
    for (let y = height - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }

  function placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  function endGame(msg) {
    alert(msg);
  }

  function handleClick(evt) {
    const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  board[y][x] = currPlayer;
  placeInTable(y, x);
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  currPlayer = currPlayer === 1 ? 2 : 1;
}

function checkForWin() {
    function _win(cells) {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < height &&
          x >= 0 &&
          x < width &&
          board[y][x] === currPlayer
      );
    }
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
  
  createBoard();
  htmlBoard();
