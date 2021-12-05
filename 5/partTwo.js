const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\r\n");

const points = {};

for (let line of data) {
    let [[x1, y1], [x2, y2]] = line.split(" -> ").map(e => e.split(",").map(num => parseInt(num)));

    if (x1 == x2) {
        let start = y1 > y2 ? y2 : y1;
        let end = y1 > y2 ? y1 : y2;

        for (let i = start; i <= end; i++) {
            points[x1 + "," + i] = (points[x1 + "," + i] || 0) + 1;
        }
    } else if (y1 == y2) {
        let start = x1 > x2 ? x2 : x1;
        let end = x1 > x2 ? x1 : x2;

        for (let i = start; i <= end; i++) {
            points[i + "," + y1] = (points[i + "," + y1] || 0) + 1;
        }
    } else {
        let xPositive = x1 < x2;
        let yPositive = y1 < y2;

        let xOffset = 0;
        let yOffset = 0;

        // hahaha
        while (true) {
            let changedX = x1 + (xPositive ? xOffset : -xOffset);
            let changedY = y1 + (yPositive ? yOffset : -yOffset);
            let point = changedX + "," + changedY;

            points[point] = (points[point] || 0) + 1;

            if (point == (x2 + "," + y2)) break;

            xOffset++;
            yOffset++;
        }
    }
}

console.log(Object.values(points).filter(e => e > 1).length);