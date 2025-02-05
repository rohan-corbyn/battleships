import Ship from "./Ship";

describe("testing ship", () => {
  test("ship hit", () => {
    let ship = new Ship(5);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("sink isSunk", () => {
    let ship = new Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
