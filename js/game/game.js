import Menu from "../../menu/menu.js";
import GameManager from "./GameManager.js";
import Player from "../player/Player.js";

const menu = new Menu(beginGame);

function beginGame() {
  const menuIds = menu.INPUT_IDS;
  const gameSettings = {
    player1AI: document.getElementById(menuIds.player1IsAICheckbox).checked,
    player2AI: document.getElementById(menuIds.player2IsAICheckbox).checked,
    gameboardSize: document.getElementById(menuIds.gameboardSizeInput).value,
  };

  const player1 = new Player(1, "tom", gameSettings);
  const player2 = new Player(2, "jerry", gameSettings);
  document.getElementById("game-area").innerHTML = "";
  new GameManager(player1, player2, 3);
}
