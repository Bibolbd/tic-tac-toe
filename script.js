const GameBoard = () => {
  let gameboard = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
  return gameboard;
};

const gameboard = GameBoard();

const renderGameBoard = (gameboard) => {
  gameboard.map((cellValue, cellIndex) => {
    const cellElement = document.querySelector(
      `#main-container > div:nth-child(${cellIndex + 1})`
    );
    cellElement.textContent = cellValue;
  });
};

renderGameBoard(gameboard);
