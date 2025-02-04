const Ship = require('./ship');

describe('testing ship', () => {

    test('hit ship', () => {
        let ship = new Ship(5);
        ship.hit();
        expect(ship.hits).toBe(1)
    });

    test('sink ship', () => {
        let ship = new Ship(2);
        ship.hit();
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});