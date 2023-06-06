const gameBoard = (() => {
  let gameboard = Array(9).fill(undefined);

  const setCell = (index, value) => {
    gameboard[index] = value;
  };

  const resetBoard = () => {
    gameboard.forEach((_, index) => {
      gameboard[index] = undefined;
    });
    renderGameBoard(gameboard);
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
            gameController.checkForWin(
              gameController.getCurrentPlayer(),
              gameboard
            ),
            gameController.switchPlayer(),
            gameController.displayPlayer(
              gameController.getCurrentPlayer().name
            ))
          : console.log("Put your mark on emtpy cell!");
      });
    });
  };

  const clearBoard = () => {
    const restartButton = document.querySelector("#restartButton");
    restartButton.addEventListener("click", () => {
      resetBoard();
    });
  };

  return {
    gameboard,
    clearBoard,
    addMarker,
    resetBoard,
  };
})();

const gameController = (() => {
  const Player = (name, marker) => {
    return { name, marker };
  };

  let player1 = Player("player1", "X");
  let player2 = Player("player2", "X");
  let currentPlayer = player1;

  const chooseMarker = () => {
    const choiceDisplayer = document.querySelector("#chooseMarker");
    choiceDisplayer.classList.add("visible");
    const markerButtons = document.querySelectorAll('[id^="marker"]');
    markerButtons.forEach((markerButton) => {
      markerButton.addEventListener("click", () => {
        player1.marker = markerButton.textContent;
        player2.marker = player1.marker === "O" ? "X" : "O";
        choiceDisplayer.classList.remove("visible");
        choiceDisplayer.classList.add("hidden");
      });
    });
  };

  const startChoose = () => {
    const playButton = document.querySelector("#play");
    playButton.addEventListener("click", chooseMarker);
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

  const winConditions = [
    { first: 0, second: 1, third: 2 },
    { first: 3, second: 4, third: 5 },
    { first: 6, second: 7, third: 8 },
    { first: 0, second: 3, third: 6 },
    { first: 1, second: 4, third: 7 },
    { first: 2, second: 5, third: 8 },
    { first: 0, second: 4, third: 8 },
    { first: 2, second: 4, third: 6 },
  ];

  const checkForWin = (player, gameboard) => {
    const marker = player.marker;
    let isWin = false;
    winConditions.forEach((condition) => {
      if (
        gameboard[condition.first] === marker &&
        gameboard[condition.second] === marker &&
        gameboard[condition.third] === marker
      ) {
        isWin = true;
        console.log(`${player.name} has won!!!`);
        // switchPlayer();
        gameBoard.resetBoard();
      }
    });

    if (!isWin) {
      const isTie = gameboard.every((cell) => cell !== undefined);
      if (isTie) {
        console.log("It's a tie!");
        gameBoard.resetBoard();
      }
    }
  };

  return {
    getCurrentPlayer,
    switchPlayer,
    displayPlayer,
    checkForWin,
    startChoose,
  };
})();

const gameboard = gameBoard.gameboard;
gameController.startChoose();
gameBoard.addMarker();
gameBoard.clearBoard();
