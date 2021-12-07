// definitely can be improved (performance wise)

const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split(",").map(e => parseInt(e));

const max = data.reduce((a, c) => Math.max(a, c));
const steps = {};

for (let j = 0; j < max; j++) {
    steps[j] = 0;

    for (let num of data) {
        let distance = Math.abs(j - num);

        for (let i = 1; i <= distance; i++) {
            steps[j] += i;
        }
    }
}

console.log(Object.entries(steps).sort(([ ,v1], [ ,v2]) => v1 - v2)[1][1]);