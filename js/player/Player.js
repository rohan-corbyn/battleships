import Gameboard from "../gameboard/Gameboard.js";

class Player {
  constructor(isPlayer1, isAI, gameboardXSize, gameboardYSize) {
    this.gameAreaId = isPlayer1 ? "player-1-area" : "player-2-area";
    this.isAI = isAI;
    this.gameboard = new Gameboard(gameboardXSize, gameboardYSize);
  }

  playRandomAttack(otherPlayerGameboard) {
    let spaceFound = false;

    while (!spaceFound) {
      const row = Math.floor(Math.random() * otherPlayerGameboard.rows);
      const col = Math.floor(Math.random() * otherPlayerGameboard.columns);

      if (!otherPlayerGameboard.attackArray[row][col]) {
        spaceFound = true;
        otherPlayerGameboard.receiveAttack(row, col);
      }
    }
  }
}

export default Player;
