class GameRenderer {
  cellSize = 50;
  renderGameArea(player1, player2) {
    const player1Area = document.createElement("div");
    player1Area.id = player1.gameAreaId;
    const player2Area = document.createElement("div");
    player2Area.id = player2.gameAreaId;
    player1Area.appendChild(this.renderPlayerBoard(player1, true));
    player2Area.appendChild(this.renderPlayerBoard(player2));
    document.getElementById("game-area").append(player2Area, player1Area);
  }

  renderPlayerBoard(player, display = false) {
    const gameboard = document.createElement("div");
    gameboard.className = "gameboard";
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

        if (display && player.gameboard.shipArray[r][c]) {
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
    return gameboard;
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
