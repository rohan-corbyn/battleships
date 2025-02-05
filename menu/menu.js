import GameManager from "../js/game/GameManager.js";

class Menu {
  renderMenu() {
    const menu = document.createElement("div");
    menu.className = "menu-container";
    const menuTitle = document.createElement("div");
    menuTitle.innerText = "BATTLESHIPS";
    menuTitle.className = "menu-title";
    const startGameButton = document.createElement("button");
    startGameButton.className = "menu-button";
    startGameButton.innerText = "New Game";
    startGameButton.onclick = () => this.startGameMenu();
    const openSettingsButton = document.createElement("button");
    openSettingsButton.className = "menu-button";
    openSettingsButton.innerText = "Settings";
    openSettingsButton.onclick = () => this.openSettingsMenu();
    const showCreditsButton = document.createElement("button");
    showCreditsButton.innerText = "Credits";
    showCreditsButton.className = "menu-button";
    showCreditsButton.onclick = () => this.showCreditsMenu();

    menu.append(
      menuTitle,
      startGameButton,
      openSettingsButton,
      showCreditsButton
    );

    document.getElementById("game-area").innerHTML = "";
    document.getElementById("game-area").appendChild(menu);
  }

  renderStartGameMenu() {
    const menu = document.createElement("div");
    menu.className = "menu-container";
    const menuTitle = document.createElement("div");
    menuTitle.innerText = "OPTIONS";
    menuTitle.className = "menu-title";
    const isPlayer1AIContainer = document.createElement("div");
    isPlayer1AIContainer.className = "checkbox-container";
    const isPlayer1AILabel = document.createElement("label");
    isPlayer1AILabel.innerText = "Player 1 AI";
    const isPlayer1AICheckbox = document.createElement("input");
    isPlayer1AICheckbox.id = "player-1-ai-checkbox";
    isPlayer1AICheckbox.type = "checkbox";
    isPlayer1AIContainer.append(isPlayer1AILabel, isPlayer1AICheckbox);

    const isPlayer2AIContainer = document.createElement("div");
    isPlayer2AIContainer.className = "checkbox-container";
    const isPlayer2AILabel = document.createElement("label");
    isPlayer2AILabel.innerText = "Player 2 AI";
    const isPlayer2AICheckbox = document.createElement("input");
    isPlayer2AICheckbox.id = "player-2-ai-checkbox";
    isPlayer2AICheckbox.type = "checkbox";
    isPlayer2AIContainer.append(isPlayer2AILabel, isPlayer2AICheckbox);

    const startGameButton = document.createElement("button");
    startGameButton.className = "menu-button";
    startGameButton.innerText = "Start Game";
    startGameButton.onclick = () => this.startGame();

    menu.append(
      menuTitle,
      isPlayer1AIContainer,
      isPlayer2AIContainer,
      startGameButton
    );

    document.getElementById("game-area").innerHTML = "";
    document.getElementById("game-area").appendChild(menu);
  }

  startGameMenu() {
    document.getElementById("game-area").innerHTML = "";
    this.renderStartGameMenu();
  }

  openSettingsMenu() {
    alert("Settings will be added in future update");
  }

  showCreditsMenu() {
    alert("Game developed by Rohan Corbyn!");
  }

  startGame() {
    // to be implemented as working options when starting the game.
    // const player1AI = document.getElementById("player-1-ai-checkbox").checked;
    // const player2AI = document.getElementById("player-2-ai-checkbox").checked;
    // const boardSize ...
    document.getElementById("game-area").innerHTML = "";
    const gameManager = new GameManager(false, 4, 4);
  }
}

export default Menu;
