const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n").map(e => e.replace(/\r/g, ""));

const charMap = {
    "(": ")",
    "{": "}",
    "<": ">",
    "[": "]",
};

const pointMap = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

const totalScores = [];

for (let line of data) {
    const openChars = [];

    let totalScore = 0;
    let corrupt = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (Object.keys(charMap).includes(char)) {
            openChars.push(char);
        } else {
            if (openChars.length == 0) {
                break;
            }

            const expected = openChars.pop();

            if (charMap[expected] != char) {
                corrupt = true;
                break;
            }
        }

        if (!corrupt && i == line.length - 1) {
            for (let openChar of openChars.reverse()) {
                line += charMap[openChar];
                
                totalScore *= 5;
                totalScore += pointMap[charMap[openChar]];
            }
        }
    }

    if (totalScore != 0) totalScores.push(totalScore);
}

console.log(totalScores.sort((a, b) => a - b)[parseInt(totalScores.length / 2)]);