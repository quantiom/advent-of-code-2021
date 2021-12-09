const fs = require("fs");
const data = fs
    .readFileSync("./data.txt", "utf8")
    .replace(/\r/g, "")
    .split("\n")
    .map((e) => e.split("").map((e1) => parseInt(e1)));

let lowPoints = [];

for (let i = 0; i < data.length; i++) {
    let line = data[i];

    for (let j = 0; j < line.length; j++) {
        let current = line[j];

        if (i != 0 && data[i - 1][j] <= current) continue;
        if (i != data.length - 1 && data[i + 1][j] <= current) continue;

        if (j != 0 && line[j - 1] <= current) continue;
        if (j != line.length - 1 && line[j + 1] <= current) continue;

        lowPoints.push({ x: j, y: i, num: current });
    }
}

console.log(Object.values(lowPoints).reduce((a, c) => a + c.num + 1, 0));
