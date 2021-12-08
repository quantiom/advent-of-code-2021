const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n");

const digitMapping = {
    "abcefg": 0,
    "cf": 1,
    "acdeg": 2,
    "acdfg": 3,
    "bcdf": 4,
    "abdfg": 5,
    "abdefg": 6,
    "acf": 7,
    "abcdefg": 8,
    "abcdfg": 9
}

let total = 0;

for (let line of data) {
    let strDigits = "";
    const split = line.replace(/\\r/g, "").split(" | ");

    let uniques = [];
    const digits = split[0].split(" ");

    digits.forEach(e => {
        if (e.length == 2 || e.length == 3 || e.length == 4 || e.length == 7) {
            uniques.push(e);
        }
    });

    uniques = uniques.sort((a, b) => a.length - b.length);

    const getUniqueEncodedDigits = (length) => uniques.find(unique => unique.length == length).split("");

    const nine = digits.find(e => e.length == 6 && getUniqueEncodedDigits(4).every(e1 => e.includes(e1)));
    const zero = digits.find(e => e.length == 6 && e != nine && getUniqueEncodedDigits(2).every(e1 => e.includes(e1)));
    const six = digits.find(e => e.length == 6 && e != nine && e != zero);

    const top = getUniqueEncodedDigits(3).find(e => !getUniqueEncodedDigits(2).includes(e));
    const bottomLeft = getUniqueEncodedDigits(7).find(e => !nine.includes(e));
    const middle = getUniqueEncodedDigits(7).find(e => !zero.includes(e));
    const topRight = getUniqueEncodedDigits(7).find(e => !six.includes(e));
    const bottom = getUniqueEncodedDigits(7).find(e => ![...getUniqueEncodedDigits(4), top, bottomLeft].includes(e));
    const bottomRight = getUniqueEncodedDigits(3).find(e => e != top && e != topRight);
    const topLeft = getUniqueEncodedDigits(4).find(e => e != topRight && e != middle && e != bottomRight);

    const configuration = {
        [top]: "a",
        [topLeft]: "b",
        [topRight]: "c",
        [middle]: "d",
        [bottomLeft]: "e",
        [bottomRight]: "f",
        [bottom]: "g"
    };

    const encodedDigits = split[1].split(" ");

    for (encodedDigit of encodedDigits) {
        strDigits += digitMapping[encodedDigit.split("").map(char => configuration[char]).sort().join("")].toString();
    }

    total += parseInt(strDigits);
}

console.log(total);