class Ship {
  constructor(id, length, isHorizontal = false) {
    this.id = id;
    this.length = length;
    this.hits = 0;
    this.isHorizontal = isHorizontal;
  }

  hit() {
    if (this.hits >= this.length) {
      throw new Error("ship has already been hit" + this.hits + "times.");
    } else {
      this.hits++;
    }
  }

  isSunk() {
    return this.hits === this.length;
  }
}

export default Ship;
