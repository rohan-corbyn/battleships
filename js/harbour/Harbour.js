import Ship from "../ship/Ship.js";

class Harbour {
  constructor(player, numShips) {
    this.ships = {};
    this.selectedShipDom = null;
    this.isHorizontal = true;
    this.player = player;
    this.gameboard = this.player.gameboard;
    for (let shipNum = 0; shipNum < numShips; shipNum++) {
      const shipLength = shipNum + 1;
      let id = shipNum + 1;
      this.ships["#" + id] = new Ship(id, shipLength, false);
    }
  }

  selectShip(ship) {
    let dockedShips = document.querySelectorAll("#harbour > .ship");
    this.selectedShipDom = false;
    dockedShips.forEach((ship) => {
      ship.classList.remove("selected");
    });
    this.selectedShipDom = ship;
    ship.classList.add("selected");
  }

  addEvents(gameRenderer) {
    let ships = document.querySelectorAll(".ship");

    ships.forEach((ship) => {
      ship.draggable = true;
      ship.addEventListener("dragstart", () => {
        this.selectShip(ship);
      });

      ship.addEventListener("click", () => {
        this.selectShip(ship);
      });

      ship.addEventListener("dragend", () => {});
    });

    document.getElementById("rotate-button").addEventListener("click", () => {
      console.log(this.selectedShipDom);
      if (this.selectedShipDom.getAttribute("data-is-horizontal") === false) {
        this.selectedShipDom.setAttribute("data-is-horizontal", true);
      } else {
        this.selectedShipDom.style.transform = "rotate(0deg)";
        this.selectedShipDom.setAttribute("data-is-horizontal", false);
        this.selectedShipDom.classList.remove("horizontal");
      }
    });

    const playerGameboardEle = document.getElementById("player-1-board");

    playerGameboardEle.addEventListener("dragenter", (event) => {
      if (event.target.classList.contains("cell")) {
        const position = this.getCellPosition(event.target);
        const ship = this.getSelectedShip();
        if (this.gameboard.canPlaceShip(ship, position))
          event.target.classList.add("dragover-blue");
        else {
          event.target.classList.add("dragover-red");
        }
      }
    });

    playerGameboardEle.addEventListener("dragleave", (event) => {
      if (event.target.classList.contains("cell")) {
        event.target.classList.remove("dragover-red");
        event.target.classList.remove("dragover-blue");
      }
    });

    playerGameboardEle.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    playerGameboardEle.ondrop = (event) => {
      this.handleDrop(event, gameRenderer);
    };
  }

  handleDragEnd(ship) {
    ship.classList.remove("selected");
  }

  handleDrop(event, gameRenderer) {
    event.preventDefault();

    if (event.target.classList.contains("cell")) {
      const placedCell = event.target;
      const position = this.getCellPosition(placedCell);
      const ship = this.getSelectedShip();
      position.isHorizontal = ship.isHorizontal;
      if (this.gameboard.canPlaceShip(ship, position)) {
        this.gameboard.placeShip(ship, position);
        this.deleteSelectedShip();
        gameRenderer.renderGameboard(this.player, true);
        gameRenderer.renderHarbour(this);
        this.addEvents(gameRenderer);
      }
    }
    return false;
  }

  getSelectedShip() {
    const shipId = "#" + this.selectedShipDom.getAttribute("data-ship-id");
    return this.ships[shipId];
  }

  deleteSelectedShip() {
    const shipId = "#" + this.selectedShipDom.getAttribute("data-ship-id");
    delete this.ships[shipId];
  }

  getCellPosition(element) {
    const row = Number(element.getAttribute("data-row"));
    const col = Number(element.getAttribute("data-col"));
    console.log(typeof row);
    console.log(typeof col);
    return { row, col };
  }

  getIsHorizontal(element) {
    return element.getAttribute("data-is-horizontal");
  }
}

export default Harbour;
