const gameBoard = (() => {
  let gameboard = Array(9);

  const setCell = (index, value) => {
    gameboard[index] = value;
  };

  const resetBoard = () => {
    gameboard.forEach((_, index) => {
      gameboard[index] = undefined;
    });
  };

  const renderGameBoard = (gameboard) => {
    gameboard.map((cellValue, cellIndex) => {
      const cellElement = document.querySelector(
        `#main-container > div:nth-child(${cellIndex + 1})`
      );
      cellElement.textContent = cellValue;
    });
  };

  const addMarker = () => {
    const cells = document.querySelectorAll('[id^="cell-"]');
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const cellId = parseInt(cell.id.replace("cell-", ""));
        console.log("Clicked cell:", cellId);
        setCell(cellId - 1, "X");
        renderGameBoard(gameboard);
      });
    });
  };

  const clearBoard = () => {
    const resetButton = document.querySelector("#resetButton");
    resetButton.addEventListener("click", () => {
      resetBoard();
      renderGameBoard(gameboard);
    });
  };

  return {
    gameboard,
    clearBoard,
    addMarker,
  };
})();

const gameboard = gameBoard.gameboard;
gameBoard.addMarker();
gameBoard.clearBoard();
