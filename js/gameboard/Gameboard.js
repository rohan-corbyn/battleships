class Gameboard {
  constructor(gameboardSize) {
    console.log(gameboardSize);
    const rows = gameboardSize;
    const columns = gameboardSize;
    this.shipArray = [];
    this.attackArray = [];

    for (let i = 0; i < rows; i++) {
      this.shipArray[i] = [];
      this.attackArray[i] = [];
      for (let j = 0; j < columns; j++) {
        this.shipArray[i][j] = "E";
        this.attackArray[i][j] = "E";
      }
    }

    this.shipsPlaced = 0;
    this.shipsSunk = 0;
    this.rows = rows;
    this.columns = columns;
  }

  canPlaceShip(ship, position) {
    if (ship.isHorizontal) {
      for (let i = 0; i > -ship.length; i--) {
        if (this.isSquareAvailable(position.row, position.col + i)) {
          return false;
        }
      }
    } else {
      for (let i = 0; i > -ship.length; i--) {
        if (this.isSquareAvailable(position.row + i, position.col)) {
          return false;
        }
      }
    }
    return true;
  }

  isSquareAvailable(row, col) {
    return !this.shipArray[row] || this.shipArray[row][col] !== "E";
  }

  placeShip(ship, position) {
    if (ship.isHorizontal) {
      for (let i = 0; i > -ship.length; i--) {
        this.shipArray[position.row][position.col + i] = ship;
      }
    } else {
      for (let i = 0; i > -ship.length; i--) {
        this.shipArray[position.row + i][position.col] = ship;
      }
    }
    this.shipsPlaced++;
  }

  receiveAttack(x, y) {
    if (!this.attackArray[x][y]) {
      if (this.shipArray[x][y]) {
        let hitShip = this.shipArray[x][y];
        hitShip.hit();
        this.attackArray[x][y] = "H";
        if (hitShip.isSunk()) {
          this.shipsSunk++;
        }
      } else {
        this.attackArray[x][y] = "M";
      }
    } else {
      throw new Error(
        "This square has already been attacked, please choose a different square."
      );
    }
  }

  areAllShipsSunk() {
    return this.shipsSunk >= this.shipsPlaced;
  }
}

export default Gameboard;
