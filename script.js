let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let cells = document.querySelectorAll(".cell");
let msg = document.querySelector(".msg");
let restartBtn = document.querySelector(".restart");
let playerSelect = document.querySelector(".player-select");
let gameContainer = document.querySelector(".game-container");
let chooseX = document.getElementById("chooseX");
let chooseO = document.getElementById("chooseO");

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    handleClick(cell);
  });
});

function handleClick(cell) {
  if (gameOver) return;
  let index = cell.id;
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "x" : "o");

  switchPlayer();
  checkWinner();
  checkDraw();
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayer = "X";
  msg.innerText = `Player ${currentPlayer}'s turn`;

  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("x", "o", "winner");
  });

  gameContainer.classList.add("hidden");
  playerSelect.classList.remove("hidden");
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  msg.innerText = `Player ${currentPlayer}'s turn`;
}

function checkDraw() {
  if (board.every((cell) => cell != "") && !gameOver) {
    msg.innerText = "It's a draw!";
    msg.style.color = "yellow";

    setTimeout(() => {
      msg.style.color = "white";
      resetGame();
    }, 2000);

    gameOver = true;
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      msg.innerText = `Player ${board[a]} wins!`;
      msg.style.color = "lightgreen";
      gameOver = true;

      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");

      return;
    }
  }
}

function startGame() {
  playerSelect.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  msg.innerText = `Player ${currentPlayer}'s turn`;
}

chooseX.addEventListener("click", () => {
  currentPlayer = "X";
  startGame();
});

chooseO.addEventListener("click", () => {
  currentPlayer = "O";
  startGame();
});

restartBtn.addEventListener("click", () => {
  resetGame();
});
