const width = 7;
const height = 6;

let playerRed = "R";
let playerYellow = "Y";
let currPlayer = playerRed;
var gameOver = false;
let board;
var currColumns;

window.onload = function() {
  setGame();
}

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for(let h = 0; h < height; h++) {
    let height = [];
    for(let w = 0; w < width; w++) {
      height.push(' ');

      let tile = document.createElement("div");
      tile.id = h.toString() + "-" + w.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(height);
  }
}

function setPiece() {
  if(gameOver) {
    return;
  }
  
  let coords = this.id.split("-");
  let h = parseInt(coords[0])
  let w = parseInt(coords[1]);

  h = currColumns[w];
  if (h < 0) {
    return;
  }

  board[h][w] = currPlayer;
  let tile = document.getElementById(h.toString() + "-" + w.toString());
  if (currPlayer == playerRed) {
    tile.classList.add("red-piece");
    currPlayer = playerYellow;
  }
  else {
    tile.classList.add("yellow-piece");
    currPlayer= playerRed;
  }

  h -= 1;
  currColumns[w] = h;

  checkWinner();
}

function checkWinner() {
  
  for(let h = 0; h < height; h++) {
    for (let w = 0; w < width -3; w++) {
      if (board[h][w] != ' ') {
        if (board[h][w] == board[h][w+1] && board[h][w+1] == board[h][w+2] && board[h][w+2] == board[h][w+3]) {
          setWinner(h, w);
          return;
        }
      }
    }
  }

  for(let w = 0; w < width; w++) {
    for(let h = 0; h < height -3; h++) {
      if (board[h][w] != ' ') {
        if (board[h][w] == board[h+1][w] && board[h+1][w] == board[h+2][w] && board[h+2][w] == board[h+3][w]) {
          setWinner(h, w);
          return;
        }
      }
    }
  }

  for(let w = 0; w < width - 3; w++) {
    for(let h = 0; h < height - 3; h++) {
      if (board[h][w] != ' ') {
        if (board[h][w] == board[h+1][w+1] && board[h+1][w+1] == board[h+2][w+2] && board[h+2][w+2] == board[h+3][w+3]) {
          setWinner(h, w);
          return;
        }
      }
    }
  }
  
  for(let w = 3; w < width; w++) {
    for(let h = 0; h < height - 3; h++) {
      if (board[h][w] != ' ') {
        if (board[h][w] == board[h-1][w+1] && board[h-1][w+1] == board[h-2][w+2] && board[h-2][w+2] == board[h-3][w+3]) {
          setWinner(h, w);
          return;
        }
      }
    }
  }
}
    

function setWinner(h, w) {
  let winner = document.getElementById("winner");
  if(board[h][w] == playerRed) {
    winner.innerText = "Red Wins";
   } else {
      winner.innerText = "Yellow Wins"; 
    }
  gameOver = true;
}
  
