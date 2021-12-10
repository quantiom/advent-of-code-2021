const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n").map(e => e.replace(/\r/g, ""));

const charMap = {
    "(": ")",
    "{": "}",
    "<": ">",
    "[": "]",
};

const pointMap = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

let corruptedScore = 0;

for (const line of data) {
    const openChars = [];

    for (const char of line) {
        if (Object.keys(charMap).includes(char)) {
            openChars.push(char);
        } else {
            if (openChars.length == 0) {
                break;
            }

            const expected = openChars.pop();

            if (charMap[expected] != char) {
                corruptedScore += pointMap[char];
                break;
            }
        }
    }
}

console.log(corruptedScore);