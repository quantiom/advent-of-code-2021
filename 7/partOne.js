const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split(",").map(e => parseInt(e));

const steps = {};

for (let num of data) {
    steps[num] = 0;

    for (let otherNum of data) {
        steps[num] += Math.abs(num - otherNum);
    }
}

var [lowestItems] = Object.entries(steps).sort(([ ,v1], [ ,v2]) => v1 - v2);

let total = 0;

for (let num of data) {
    total += Math.abs(lowestItems[0] - num);
}

console.log(total);