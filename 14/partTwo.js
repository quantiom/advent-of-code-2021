const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\r\n");

const start = data[0];

let pairs = {};
let lastCharacter = "";

const rules = {};

for (let i = 2; i < data.length; i++) {
    const [find, replace] = data[i].split(" -> ");
    rules[find] = replace;
}

for (let i = 0; i < start.length - 1; i++) {
    const pair = start[i] + start[i + 1];
    pairs[pair] = (pairs[pair] || 0) + 1;
    lastCharacter = pair[1];
}

function step() {
    const newPairs = {};

    Object.keys(pairs).forEach((pair) => {
        if (!rules[pair]) return;

        const pairOne = pair[0] + rules[pair];
        const pairTwo = rules[pair] + pair[1];

        if (newPairs.hasOwnProperty(pairOne)) {
            newPairs[pairOne] += pairs[pair];
        } else {
            newPairs[pairOne] = pairs[pair];
        }

        if (newPairs.hasOwnProperty(pairTwo)) {
            newPairs[pairTwo] += pairs[pair];
        } else {
            newPairs[pairTwo] = pairs[pair];
        }
    });

    pairs = newPairs;
}

for (let i = 0; i < 40; i++) {
    step();
}

const letterCount = {};

for (let i = 0; i < Object.keys(pairs).length; i++) {
    const pair = Object.keys(pairs)[i];
    const value = pairs[pair];

    if (!letterCount[pair[0]]) letterCount[pair[0]] = 0;

    letterCount[pair[0]] += value;
}

// count the last character or else the answer will be off by 1
letterCount[lastCharacter] += 1;

console.log(Math.max(...Object.values(letterCount)) - Math.min(...Object.values(letterCount)));
