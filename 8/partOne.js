const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n");

// one liner because why not
console.log(data.reduce((a, c) => a + c.replace(/\r/g, "").split(" | ")[1].split(" ").reduce((aa, cc) => aa + ([2, 3, 4, 7].some(e => cc.length == e) ? 1 : 0), 0), 0));