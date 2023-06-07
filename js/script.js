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
    const restartButton = document.querySelector("#restart");
    restartButton.addEventListener("click", () => {
      resetBoard();
      document.querySelector("#player1Score").textContent = "0:";
      document.querySelector("#player2Score").textContent = "0";
      player1Count = 0;
      player2Count = 0;
      gameCount = 1;
      document.querySelector("#play").style.display = "block";
      document.querySelector("#result").style.display = "none";
    });
  };

  return {
    gameboard,
    clearBoard,
    addMarker,
    resetBoard,
  };
})();

let player1Count = 0;
let player2Count = 0;
let gameCount = 1;

const gameController = (() => {
  const Player = (name, marker) => {
    return { name, marker };
  };

  let player1 = Player("player1", "X");
  let player2 = Player("player2", "X");
  let gameCount = 1;
  let currentPlayer = player1;

  const chooseMarker = () => {
    document.querySelector("#play").style.display = "none";
    const choiceDisplayer = document.querySelector("#chooseMarker");
    choiceDisplayer.style.display = "flex";
    const markerButtons = document.querySelectorAll('[id^="marker"]');
    markerButtons.forEach((markerButton) => {
      markerButton.addEventListener("click", () => {
        player1.marker = markerButton.textContent;
        player2.marker = player1.marker === "O" ? "X" : "O";
        choiceDisplayer.style.display = "none";
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
    displayer.textContent = `${name}`;
    displayer.style.color = name === "player1" ? "var(--red)" : "var(--green)";
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
        const player1Score = document.querySelector("#player1Score");
        const player2Score = document.querySelector("#player2Score");
        player === player1
          ? (player1Count++, (player1Score.textContent = player1Count + ":"))
          : (player2Count++, (player2Score.textContent = player2Count));
        gameCount++;
        currentPlayer = gameCount % 2 === 0 ? player1 : player2;
        gameResult();
        gameBoard.resetBoard();
      }
    });

    if (!isWin) {
      const isTie = gameboard.every((cell) => cell !== undefined);
      if (isTie) {
        console.log("It's a tie!");
        gameCount++;
        currentPlayer = gameCount % 2 === 0 ? player1 : player2;
        player1Count++;
        player2Count++;
        player1Score.textContent = player1Count + ":";
        player2Score.textContent = player2Count;
        gameResult();
        gameBoard.resetBoard();
      }
    }
  };

  const gameResult = () => {
    const result = document.querySelector("#result");
    const resulth1 = document.querySelector("#result h1");
    const resultimg = document.querySelector("#result img");
    if (player1Count == 3 && player2Count == 3) {
      result.style.display = "flex";
      resulth1.textContent = "draw";
      resultimg.src = "../assets/Group 9.png";
    } else if (player1Count == 3 && player1Count > player2Count) {
      result.style.display = "flex";
      resulth1.textContent = "player one win";
      resultimg.src = "../assets/trophy (2) 1.png";
    } else if (player2Count == 3 && player2Count > player1Count) {
      result.style.display = "flex";
      resulth1.textContent = "player two win";
      resultimg.src = "../assets/trophy (2) 1.png";
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
