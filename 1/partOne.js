const fs = require("fs");

const data = fs
    .readFileSync("./data.txt", "utf8")
    .split("\n")
    .map((e) => parseInt(e));

let increaseCount = 0;
let lastNumber = null;

for (let number of data) {
    if (lastNumber && number > lastNumber) {
        increaseCount++;
    }

    lastNumber = number;
}

console.log(increaseCount);
