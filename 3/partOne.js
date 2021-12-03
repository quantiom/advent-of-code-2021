const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n");

let gammaRate = "";
let epsilonRate = "";

for (let x = 0; x < 2; x++) {
    for (let i = 0; i < data[0].length - 1; i++) {
        let ones = 0;
        let zeros = 0;

        for (let j = 0; j < data.length; j++) {
            if (parseInt(data[j][i]) == 0) {
                zeros++;
            } else {
                ones++;
            }
        }

        if (x == 0) {
            if (ones > zeros) {
                gammaRate += "1";
            } else {
                gammaRate += "0";
            }
        } else {
            if (ones > zeros) {
                epsilonRate += "0";
            } else {
                epsilonRate += "1";
            }
        }
    }
}

console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
