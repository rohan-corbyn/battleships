import Gameboard from "../gameboard/Gameboard.js";

class Player {
  constructor(position, name, settings) {
    this.position = position;
    const isPlayer1 = this.position === 1;
    this.name = name ? name : isPlayer1 ? "Player 1" : "Player 2";
    this.gameAreaId = isPlayer1 ? "player-1-area" : "player-2-area";
    this.isAI = isPlayer1 ? settings.player1IsAI : settings.player2IsAI;
    this.gameboard = new Gameboard(settings.gameboardSize);
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
