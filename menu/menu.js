class Menu {
  INPUT_IDS = {
    player1IsAICheckbox: "player-1-ai-checkbox",
    player2IsAICheckbox: "player-2-ai-checkbox",
    gameboardSizeInput: "gameboard-size-number",
  };

  constructor(startGameFunction) {
    this.renderMenu();
    this.startGameFunction = startGameFunction;
  }

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
    isPlayer1AICheckbox.type = "checkbox";
    isPlayer1AIContainer.append(isPlayer1AILabel, isPlayer1AICheckbox);

    const isPlayer2AIContainer = document.createElement("div");
    isPlayer2AIContainer.className = "checkbox-container";
    const isPlayer2AILabel = document.createElement("label");
    isPlayer2AILabel.innerText = "Player 2 AI";
    const isPlayer2AICheckbox = document.createElement("input");
    isPlayer2AICheckbox.type = "checkbox";
    isPlayer2AIContainer.append(isPlayer2AILabel, isPlayer2AICheckbox);

    const gameboardSizeContainer = document.createElement("div");
    gameboardSizeContainer.className = "checkbox-container";
    const gameboardSizeLabel = document.createElement("label");
    gameboardSizeLabel.innerText = "Gameboard Size";
    const gameboardSizeInput = document.createElement("input");
    gameboardSizeInput.type = "number";
    gameboardSizeInput.defaultValue = 5;
    gameboardSizeContainer.append(gameboardSizeLabel, gameboardSizeInput);

    const startGameButton = document.createElement("button");
    startGameButton.className = "menu-button";
    startGameButton.id = "start-game-button";
    startGameButton.innerText = "Start Game";

    isPlayer1AICheckbox.id = this.INPUT_IDS.player1IsAICheckbox;
    isPlayer2AICheckbox.id = this.INPUT_IDS.player2IsAICheckbox;
    gameboardSizeInput.id = this.INPUT_IDS.gameboardSizeInput;
    startGameButton.onclick = this.startGameFunction;

    menu.append(
      menuTitle,
      isPlayer1AIContainer,
      isPlayer2AIContainer,
      gameboardSizeContainer,
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
}

export default Menu;
