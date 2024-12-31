let array = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
  
  let currentPlayer = 1; // Player One = 1, Player Two = 2
  let currentPlayerName = "Player One";
  let playerOneColor = "red";
  let playerTwoColor = "yellow";
  let currentColor = playerOneColor;
  let isLock = false;
  let victorySound = new Audio("winner.mp3"); // Winner announcement sound
//   let backgroundMusic = new Audio("background.mp3"); // Background music
  
  // Тоглоомын самбар үүсгэх функц
  const createConnect4Board = () => {
    const gameBoard = document.getElementById("container");
  
    // Самбар үүсгэх
    const board = document.createElement("div");
    board.classList.add("board");
    gameBoard.appendChild(board);
  
    // 42 слот үүсгэх
    for (let i = 0; i < 42; i++) {
      const slot = document.createElement("div");
      slot.classList.add("slot");
      slot.dataset.column = i % 7;
      slot.dataset.row = Math.floor(i / 7);
      board.appendChild(slot);
    }
  
    // Reset товч нэмэх
    const resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset Game";
    resetButton.classList.add("reset_button");
    gameBoard.appendChild(resetButton);
  
    // Статус текст үүсгэх
    const status = document.createElement("h3");
    status.textContent = "Player One's Turn";
    status.classList.add("status");
    gameBoard.insertBefore(status, board);
  
    // Слот дээр дарсан үеийн реакшн
    document.querySelectorAll(".slot").forEach((slot) => {
      slot.addEventListener("click", onClick);
    });
  
    // Reset товчийг дахин тоглоход холбох
    resetButton.addEventListener("click", resetGame);
  
    // Background music тоглуулах
    // backgroundMusic.loop = true;
    // backgroundMusic.play();
  };
  
  // Тоглогч солих функц
  function togglePlayer() {
    currentPlayer = 3 - currentPlayer; // 1 <-> 2
    currentPlayerName = currentPlayer === 1 ? "Player One" : "Player Two";
    currentColor = currentPlayer === 1 ? playerOneColor : playerTwoColor;
  
    // Статус шинэчлэх
    const status = document.querySelector(".status");
    status.textContent = `${currentPlayerName}'s Turn`;
  }
  
  // 4 дараалсан диск шалгах функц
  function checkWinner(rowIndex, columnIndex) {
    const player = array[rowIndex][columnIndex];
  
    // Хөндлөн, босоо, диагональ чиглэлүүдийг шалгах
    return (
      checkDirection(rowIndex, columnIndex, 0, 1, player) || // Хөндлөн
      checkDirection(rowIndex, columnIndex, 1, 0, player) || // Босоо
      checkDirection(rowIndex, columnIndex, 1, 1, player) || // Диагональ ↘
      checkDirection(rowIndex, columnIndex, 1, -1, player)   // Диагональ ↙
    );
  }
  
  function checkDirection(rowIndex, columnIndex, rowStep, colStep, player) {
    let count = 1;
  
    count += countConsecutive(rowIndex, columnIndex, rowStep, colStep, player);
    count += countConsecutive(rowIndex, columnIndex, -rowStep, -colStep, player);
  
    return count >= 4;
  }
  
  function countConsecutive(rowIndex, columnIndex, rowStep, colStep, player) {
    let count = 0;
  
    let row = rowIndex + rowStep;
    let col = columnIndex + colStep;
  
    while (
      row >= 0 &&
      row < array.length &&
      col >= 0 &&
      col < array[0].length &&
      array[row][col] === player
    ) {
      count++;
      row += rowStep;
      col += colStep;
    }
  
    return count;
  }
  
  function onClick(event) {
    if (isLock) return; // Тоглоом түгжээтэй бол үйлдэл хийхгүй
  
    const slot = event.target;
    const columnIndex = parseInt(slot.dataset.column);
  
    // Багана дахь эхний сул мөрийг олох
    const column = array.map((row) => row[columnIndex]);
    const rowIndex = column.lastIndexOf(null);
  
    if (rowIndex === -1) {
      alert("This column is full. Choose another column!");
      return;
    }
  
    // Хүснэгтэд тоглогчийн өгөгдөл нэмэх
    array[rowIndex][columnIndex] = currentPlayer;
  
    // Слотод өнгө нэмэх
    const targetSlot = document.querySelector(
      `.slot[data-column="${columnIndex}"][data-row="${rowIndex}"]`
    );
    targetSlot.classList.add(currentColor);
  
    
    if (checkWinner(rowIndex, columnIndex)) {
      const status = document.querySelector(".status");
      status.textContent = `${currentPlayerName} Wins!`;
      isLock = true;
      victorySound.play(); // Winner announcement sound
      return;
    }
  
    // Тоглогч солих
    togglePlayer();
  }
  
  // Reset функц
  function resetGame() {
    array = array.map((row) => row.map(() => null)); // Хүснэгтийг хоослох
    document.querySelectorAll(".slot").forEach((slot) => {
      slot.classList.remove("red", "yellow");
    });
  
    currentPlayer = 1;
    currentPlayerName = "Player One";
    currentColor = playerOneColor;
    const status = document.querySelector(".status");
    status.textContent = `${currentPlayerName}'s Turn`;
    isLock = false; // Тоглоомыг дахин идэвхжүүлэх
  }
  
  // Тоглоом эхлүүлэх
  document.addEventListener("DOMContentLoaded", () => {
    createConnect4Board();
  });
  