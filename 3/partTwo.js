const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n");

function getRating(list, criteria, idx) {
    if (list.length == 1) return list[0];

    let ones = 0;
    let zeros = 0;

    for (let i = 0; i < list.length; i++) {
        if (parseInt(list[i][idx]) == 0) {
            zeros++;
        } else {
            ones++;
        }
    }

    let newList;

    if (criteria == "oxygen") {
        newList = list.filter(
            (bits) => bits[idx] == (ones == zeros ? 1 : ones > zeros ? 1 : 0)
        );
    } else {
        newList = list.filter(
            (bits) => bits[idx] == (ones == zeros ? 0 : ones > zeros ? 0 : 1)
        );
    }

    return getRating(newList, criteria, idx + 1);
}

const mostCommon = getRating(data, "oxygen", 0);
const leastCommon = getRating(data, "co2", 0);

console.log(parseInt(mostCommon, 2) * parseInt(leastCommon, 2));
