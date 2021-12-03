const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n");

let horizontal = 0;
let vertical = 0;

data.forEach((instruction) => {
    let [direction, magnitude] = instruction.split(" ");
    magnitude = parseInt(magnitude);

    switch (direction) {
        case "forward":
            horizontal += magnitude;
            break;
        case "down":
            vertical += magnitude;
            break;
        case "up":
            vertical -= magnitude;
            break;
    }
});

console.log(horizontal * vertical);
