const fs = require("fs");
const data = fs
    .readFileSync("./data.txt", "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .map((e) => e.split("").map((e1) => parseInt(e1)));

// get low points
const lowPoints = [];

for (let i = 0; i < data.length; i++) {
    const line = data[i];

    for (let j = 0; j < line.length; j++) {
        const current = line[j];

        if (i != 0 && data[i - 1][j] <= current) continue;
        if (i != data.length - 1 && data[i + 1][j] <= current) continue;

        if (j != 0 && line[j - 1] <= current) continue;
        if (j != line.length - 1 && line[j + 1] <= current) continue;

        lowPoints.push({ x: j, y: i, num: current });
    }
}

// border = 1, open space = 0
const mapped = data.map((e) => e.map((e1) => (e1 == 9 ? 1 : 0)));

function checkAround(startX, startY, points) {
    const includes = (x, y) => points.find((e) => e.x == x && e.y == y);

    if (startX < 0 || startY < 0 || startY > mapped.length - 1 || startX > mapped[startY].length - 1 || mapped[startY][startX]) {
        return points;
    }

    if (!includes(startX, startY)) {
        points.push({ x: startX, y: startY });
    }

    if (startY > 0 && mapped[startY - 1][startX] != 1 && !includes(startX, startY - 1)) {
        points.push({ x: startX, y: startY - 1 });
        checkAround(startX, startY - 1, points);
    }

    if (startY + 1 < mapped.length && mapped[startY + 1][startX] != 1 && !includes(startX, startY + 1)) {
        points.push({ x: startX, y: startY + 1 });
        checkAround(startX, startY + 1, points);
    }

    if (startX + 1 < mapped[startY].length && mapped[startY][startX + 1] != 1 && !includes(startX + 1, startY)) {
        points.push({ x: startX + 1, y: startY });
        checkAround(startX + 1, startY, points);
    }

    if (startX - 1 >= 0 && mapped[startY][startX - 1] != 1 && !includes(startX - 1, startY)) {
        points.push({ x: startX - 1, y: startY });
        checkAround(startX - 1, startY, points);
    }

    return points;
}

console.log(
    lowPoints
        .map((point) => checkAround(point.x, point.y, []).length)
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, c) => a * c, 1)
);
