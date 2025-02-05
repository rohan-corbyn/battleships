import Gameboard from "./gameboard";
import Ship from "../ship/ship";

describe("testing gameboard", () => {
  test("testing placeShip i unoccupied location", () => {
    const gameboard = new Gameboard(4, 4);
    const ship = new Ship(3);
    gameboard.placeShip(1, 1, ship, true);
    expect(gameboard.shipsPlaced).toBe(1);
  });

  test("testing placeShip in occupied location", () => {
    const gameboard = new Gameboard(4, 4);
    const ship = new Ship(3);
    gameboard.placeShip(1, 1, ship, true);

    expect(() => {
      gameboard.placeShip(1, 1, ship, true);
    }).toThrow("A ship is already occupying this space.");

    expect(gameboard.shipsPlaced).toBe(1);
  });

  test("testing receiveAttack in unoccupied location", () => {
    const gameboard = new Gameboard(4, 4);
    const ship = new Ship(3);
    gameboard.placeShip(1, 1, ship, true);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.attackArray[0][0]).toBe("M");
    expect(gameboard.attackArray[0][1]).toBe(null);
    expect(ship.hits).toBe(0);
  });

  test("testing receiveAttack in occupied location", () => {
    const gameboard = new Gameboard(4, 4);
    const ship = new Ship(3);
    gameboard.placeShip(1, 1, ship, true);
    gameboard.receiveAttack(1, 2);
    expect(gameboard.attackArray[1][2]).toBe("H");
    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBe(false);
  });

  test("testing receiveAttack twice in same location", () => {
    const gameboard = new Gameboard(4, 4);
    gameboard.receiveAttack(2, 1);
    expect(gameboard.attackArray[2][1]).toBe("M");
    expect(() => {
      gameboard.receiveAttack(2, 1);
    }).toThrow(
      "This square has already been attacked, please choose a different square."
    );
  });

  test("testing allShipsSunk", () => {
    const gameboard = new Gameboard(4, 4);
    const ship1 = new Ship(2);
    const ship2 = new Ship(1);
    gameboard.placeShip(0, 0, ship1, true);

    gameboard.placeShip(1, 0, ship2, true);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.areAllShipsSunk()).toBe(false);
    expect(ship1.isSunk()).toBe(false);
    gameboard.receiveAttack(0, 1);
    expect(ship1.isSunk()).toBe(true);
    expect(ship2.isSunk()).toBe(false);
    gameboard.receiveAttack(1, 0);
    expect(ship2.isSunk()).toBe(true);
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });
});
