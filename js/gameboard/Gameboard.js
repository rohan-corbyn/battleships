class Gameboard {
  constructor(rows, columns) {
    this.shipArray = Array.from({ length: rows }, () =>
      Array(columns).fill(null)
    );
    this.attackArray = Array.from({ length: rows }, () =>
      Array(columns).fill(null)
    );

    this.shipsPlaced = 0;
    this.shipsSunk = 0;
    this.rows = rows;
    this.columns = columns;
  }

  placeShip(x, y, ship, horizontal = true) {
    if (horizontal) {
      for (let i = 0; i < ship.length; i++) {
        if (this.shipArray[x][y + i]) {
          throw new Error("A ship is already occupying this space.");
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.shipArray[x][y + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.shipArray[x + i][y]) {
          throw new Error("A ship is already occupying this space.");
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.shipArray[x + i][y] = ship;
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
