class GameRenderer {
  cellSize = 50;

  renderGameArea(player1, player2) {
    const gameArea = document.getElementById("game-area");

    if (player2) {
      const player2Area = document.createElement("div");
      player2Area.id = player2.gameAreaId;
      gameArea.append(player2Area);
    }
    if (player1) {
      const player1Area = document.createElement("div");
      player1Area.id = player1.gameAreaId;
      gameArea.appendChild(player1Area);
    }

    if (!player2 && !player1.isAI) {
      const harbourArea = document.createElement("div");
      harbourArea.id = "harbour-area";
      gameArea.appendChild(harbourArea);
    }

    this.renderGameboard(player1, true);
    if (player2) {
      this.renderGameboard(player2);
    }
  }

  renderHarbour(harbour) {
    const harbourEle = document.createElement("div");
    harbourEle.id = "harbour";

    const rotateButton = document.createElement("button");
    rotateButton.id = "rotate-button";
    rotateButton.innerText = "rotate";

    Object.values(harbour.ships).forEach((ship) => {
      const shipEle = document.createElement("div");
      shipEle.className = "ship";
      shipEle.setAttribute("data-ship-id", ship.id);
      shipEle.setAttribute("data-is-horizontal", ship.isHorizontal);
      for (let shipUnit = 0; shipUnit < ship.length; shipUnit++) {
        const shipSquare = document.createElement("div");
        shipSquare.className = "ship-square";
        shipEle.appendChild(shipSquare);
      }
      harbourEle.append(shipEle);
    });

    const harbourArea = document.getElementById("harbour-area");
    harbourArea.innerHTML = "";
    document.getElementById("harbour-area").append(harbourEle);
    document.getElementById("harbour-area").appendChild(rotateButton);
  }

  renderGameboard(player, display = false) {
    const gameboard = document.createElement("div");
    gameboard.className = "gameboard";
    gameboard.id = "player-" + player.position + "-board";
    gameboard.style.gridTemplateColumns = `repeat(${player.gameboard.columns}, ${this.cellSize}px)`;
    gameboard.style.gridTemplateRows = `repeat(${player.gameboard.rows}, ${this.cellSize}px)`;

    const cellFragment = document.createDocumentFragment();
    for (let r = 0; r < player.gameboard.rows; r++) {
      for (let c = 0; c < player.gameboard.columns; c++) {
        const cell = Object.assign(document.createElement("div"), {
          className: "cell",
        });

        cell.setAttribute("data-row", r);
        cell.setAttribute("data-col", c);

        if (display && player.gameboard.shipArray[r][c] !== "E") {
          cell.classList.add("ship");
        }
        cellFragment.appendChild(cell);
      }
    }

    for (let r = 0; r < player.gameboard.rows; r++) {
      for (let c = 0; c < player.gameboard.columns; c++) {
        const attackInfo = player.gameboard.attackArray[r][c];
        if (attackInfo) {
          const cell = cellFragment.querySelector(
            `.cell[data-row='${r}'][data-col='${c}']`
          );
          if (attackInfo === "H") {
            cell.classList.add("hit");
          } else if (player.gameboard.attackArray[r][c] === "M") {
            cell.classList.add("miss");
          }
        }
      }
    }
    gameboard.appendChild(cellFragment);

    const game = document.getElementById(player.gameAreaId);
    game.innerHTML = "";
    game.append(gameboard);
  }

  updateGameState(player) {
    const playerBoard = document.getElementById(player.gameAreaId);
    for (let r = 0; r < player.gameboard.rows; r++) {
      for (let c = 0; c < player.gameboard.columns; c++) {
        const attackInfo = player.gameboard.attackArray[r][c];
        if (attackInfo) {
          const cell = playerBoard.querySelector(
            `.cell[data-row='${r}'][data-col='${c}']`
          );
          if (attackInfo === "H") {
            cell.classList.add("hit");
          } else if (player.gameboard.attackArray[r][c] === "M") {
            cell.classList.add("miss");
          }
        }
      }
    }
  }
}

export default GameRenderer;
