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
        gameboard[cellId - 1] === undefined
          ? (setCell(cellId - 1, gameController.getCurrentPlayer().marker),
            renderGameBoard(gameboard),
            gameController.displayPlayer(
              gameController.getCurrentPlayer().name
            ),
            gameController.switchPlayer())
          : console.log("Put your mark on emtpy cell!");
      });
    });
  };

  const clearBoard = () => {
    const restartButton = document.querySelector("#restartButton");
    restartButton.addEventListener("click", () => {
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

const gameController = (() => {
  const Player = (name, marker) => {
    return { name, marker };
  };

  let player1 = Player("player1", "O");
  let player2 = Player("player2", "X");
  let currentPlayer = player1;

  const chooseMarker = () => {
    const choiceDisplayer = document.querySelector("#chooseMarker");
    choiceDisplayer.textContent = "choose your marker Player1";
    const markerButtons = document.querySelectorAll('[id^="marker"]');
    markerButtons.forEach((markerButton) => {
      markerButton.addEventListener("click", () => {
        player1.marker = markerButton.textContent;
        player2.marker = player1.marker === "O" ? "X" : "O";
        choiceDisplayer.textContent = "";
      });
    });
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const displayPlayer = (name) => {
    const displayer = document.querySelector("#currentPlayer");
    displayer.textContent = `${name}'s turn`;
  };

  return { getCurrentPlayer, switchPlayer, displayPlayer, chooseMarker };
})();

const gameboard = gameBoard.gameboard;
gameController.chooseMarker();
gameBoard.addMarker();
gameBoard.clearBoard();
