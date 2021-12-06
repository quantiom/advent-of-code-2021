const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split(",");

// populate data
let fish = {};
for (let i = 0; i <= 8; i++) fish[i] = 0;
data.forEach(num => fish[num] += 1);

for (let i = 0; i < 256; i++) {
    let temp = fish[1];

    // shift all the values left
    for (let j = 1; j < 8; j++) {
        fish[j] = fish[j + 1];
    }

    // add the new fish
    fish[6] += fish[0];
    fish[8] = fish[0];
    fish[0] = temp;
}

console.log(Object.values(fish).reduce((a, c) => a + c));