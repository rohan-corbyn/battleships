import Player from "../player/Player.js";
import Ship from "../ship/Ship.js";
import GameRenderer from "./GameRenderer.js";

class GameManager {
  currrentTurn = 1;

  constructor(pvp, gameboardXSize, gameboardYSize) {
    this.player1 = new Player(true, false, gameboardXSize, gameboardYSize);
    this.player2 = new Player(false, !pvp, gameboardXSize, gameboardYSize);
    this.gameRenderer = new GameRenderer();
    this.createDummyGame();
    this.gameRenderer.renderGameArea(this.player1, this.player2);
    this.playGame();
  }

  createDummyGame() {
    const ship1 = new Ship(2);
    this.player1.gameboard.placeShip(1, 1, ship1);

    const ship2 = new Ship(2);
    this.player2.gameboard.placeShip(0, 0, ship2);
  }

  playGame() {
    document.querySelector("#player-2-area").addEventListener("click", (e) => {
      if (this.currrentTurn === 1) {
        if (e.target.classList.contains("cell")) {
          this.player2.gameboard.receiveAttack(
            e.target.getAttribute("data-row"),
            e.target.getAttribute("data-col")
          );
          this.gameRenderer.updateGameState(this.player2);
        }
        if (this.player2.gameboard.areAllShipsSunk()) {
          document.querySelector("body").innerHTML = "player 1 wins";
        } else {
          if (this.player2.isAI) {
            this.player2.playRandomAttack(this.player1.gameboard);
            this.gameRenderer.updateGameState(this.player1);
            if (this.player1.gameboard.areAllShipsSunk()) {
              document.querySelector("body").innerHTML = "player 2 wins";
            }
          } else {
            this.currrentTurn = 2;
          }
        }
      }
    });

    if (!this.player2.isAI) {
      document
        .querySelector("#player-1-area")
        .addEventListener("click", (e) => {
          if (this.currrentTurn === 2) {
            if (e.target.classList.contains("cell")) {
              this.player1.gameboard.receiveAttack(
                e.target.getAttribute("data-row"),
                e.target.getAttribute("data-col")
              );
              this.gameRenderer.updateGameState(this.player1);
            }
            if (this.player1.gameboard.areAllShipsSunk()) {
              document.querySelector("body").innerHTML = "player 2 wins";
            } else {
              this.currrentTurn = 1;
            }
          }
        });
    }
  }
}

export default GameManager;
