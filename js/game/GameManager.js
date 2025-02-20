import GameRenderer from "./GameRenderer.js";
import Harbour from "../harbour/harbour.js";

class GameManager {
  INIT_PHASE = 0;
  PLACING_PHASE = 1;
  GAME_PHASE = 2;

  currrentTurn = 1;

  constructor(player1, player2, numShips, boardSize) {
    this.player1 = player1;
    this.player2 = player2;
    this.numShips = numShips;
    this.boardSize = boardSize;
    this.phase = this.INIT_PHASE;
    this.gameRenderer = new GameRenderer();
    this.beginPlacingPhase();
  }

  async addGameEvents() {
    if (!this.player1.isAI) {
      this.addPlayerClickEvents(this.player1, this.player2);
    }
    if (!this.player2.isAI) {
      this.addPlayerClickEvents(this.player2, this.player1);
    }
    if (this.player1.isAI && this.player2.isAI) {
      this.playAIGame();
    }
  }

  beginPlacingPhase() {
    this.phase = this.PLACING_PHASE;
    this.gameRenderer.renderGameArea(this.player1);
    this.harbour = new Harbour(this.player1, this.numShips);
    this.gameRenderer.renderHarbour(this.harbour);
    this.harbour.addEvents(this.gameRenderer);
  }

  beginGamePhase() {
    this.phase = this.GAME_PHASE;
    this.addGameEvents();
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  addPlayerClickEvents(player, opponent) {
    console.log(opponent);
    document
      .getElementById(opponent.gameAreaId)
      .addEventListener("click", (e) => {
        if (this.currrentTurn === player.position) {
          if (e.target.classList.contains("cell")) {
            opponent.gameboard.receiveAttack(
              e.target.getAttribute("data-row"),
              e.target.getAttribute("data-col")
            );
            this.gameRenderer.updateGameState(opponent);
          }
          if (opponent.gameboard.areAllShipsSunk()) {
            this.displayEndGame(player);
          } else {
            if (opponent.isAI) {
              opponent.playRandomAttack(player.gameboard);
              this.gameRenderer.updateGameState(player);
              if (opponent.gameboard.areAllShipsSunk()) {
                this.displayEndGame(opponent);
              }
            } else {
              this.currrentTurn = opponent.position;
            }
          }
        }
      });
  }

  async playAIGame() {
    while (
      !this.player1.gameboard.areAllShipsSunk() &&
      !this.player2.gameboard.areAllShipsSunk()
    ) {
      this.player1.playRandomAttack(this.player2.gameboard);
      this.gameRenderer.updateGameState(this.player2);
      await this.sleep(50);
      if (this.player2.gameboard.areAllShipsSunk()) {
        this.displayEndGame(this.player1);
        return;
      }

      this.player2.playRandomAttack(this.player1.gameboard);
      this.gameRenderer.updateGameState(this.player1);
      await this.sleep(50);
      if (this.player1.gameboard.areAllShipsSunk()) {
        this.displayEndGame(this.player2);
        return;
      }
    }
  }

  displayEndGame(winner) {
    document.querySelector("body").innerHTML = winner.name + " wins";
  }
}

export default GameManager;
