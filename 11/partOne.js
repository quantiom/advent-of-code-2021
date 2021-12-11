const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\r\n").map(e => e.split("").map(e1 => parseInt(e1)));

function flash(y, x, flashedAlready) {
    const didFlash = (y, x) => flashedAlready.find(e => e.y == y && e.x == x);

    if (didFlash(y, x)) return flashedAlready;

    data[y][x] = 0;
    flashedAlready.push({ y, x });

    // up
    if (y != 0 && !didFlash(y - 1, x) && ++data[y - 1][x] > 9) {
        flash(y - 1, x, flashedAlready);
    }

    // down
    if (y != data.length - 1 && !didFlash(y + 1, x) && ++data[y + 1][x] > 9) {
        flash(y + 1, x, flashedAlready);
    }

    // right
    if (x != data[y].length - 1 && !didFlash(y, x + 1) && ++data[y][x + 1] > 9) {
        flash(y, x + 1, flashedAlready);
    }

    // left
    if (x != 0 && !didFlash(y, x - 1) && ++data[y][x - 1] > 9) {
        flash(y, x - 1, flashedAlready);
    }

    // bottom left
    if (y != data.length - 1 && x != 0 && !didFlash(y + 1, x - 1) && ++data[y + 1][x - 1] > 9) {
        flash(y + 1, x - 1, flashedAlready);
    }

    // bottom right
    if (y != data.length - 1 && x != data[y].length - 1 && !didFlash(y + 1, x + 1) && ++data[y + 1][x + 1] > 9) {
        flash(y + 1, x + 1, flashedAlready);
    }

    // top right
    if (y != 0 && x != data[y].length - 1 && !didFlash(y - 1, x + 1) && ++data[y - 1][x + 1] > 9) {
        flash(y - 1, x + 1, flashedAlready);
    }

    // top left
    if (y != 0 && x != 0 && !didFlash(y - 1, x - 1) && ++data[y - 1][x - 1] > 9) {
        flash(y - 1, x - 1, flashedAlready);
    }

    return flashedAlready;
}

let totalFlashed = 0;

for (let i = 0; i < 100; i++) {
    let hasFlashed = [];

    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (!hasFlashed.find(e => e.y == y && e.x == x) && ++data[y][x] > 9) {
                hasFlashed.push(flash(y, x, hasFlashed));
            }
        }
    }

    totalFlashed += data.flat().filter(e => e == 0).length;
}

console.log(totalFlashed);