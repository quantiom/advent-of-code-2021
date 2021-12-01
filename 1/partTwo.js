const fs = require("fs");

const data = fs
    .readFileSync("./data.txt", "utf8")
    .split("\n")
    .map((e) => parseInt(e));

let increaseCount = 0;
let lastSum = null;

for (let i = 0; i < data.length; i++) {
    let sum = data[i] + data[i + 1] + data[i + 2];

    if (lastSum && sum > lastSum) {
        increaseCount++;
    }

    lastSum = sum;
}

console.log(increaseCount);
