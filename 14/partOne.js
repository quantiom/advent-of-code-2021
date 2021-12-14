const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\r\n");

let start = data[0];

// this is horrible but I was just going for time/ranks
function step() {
    let toAdd = [];

    for (let i = 2; i < data.length; i++) {
        let [first, second] = data[i].split(" -> ");

        for (let j = 1; j < start.length; j++) {
            let char = start[j];
            let pair = start[j - 1] + char;

            if (pair == first) {
                toAdd.push([j, second]);
            }
        }
    }

    toAdd
        .sort((a, b) => b[0] - a[0])
        .forEach((add) => {
            start = start.slice(0, add[0]) + add[1] + start.slice(add[0]);
        });
}

for (let i = 0; i < 10; i++) {
    step();
}

const letterCount = start.split("").reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), {});

console.log(Math.max(...Object.values(letterCount)) - Math.min(...Object.values(letterCount)));
