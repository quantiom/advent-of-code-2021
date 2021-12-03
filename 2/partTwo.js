const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\n");

let aim = 0;
let horizontal = 0;
let vertical = 0;

data.forEach((instruction) => {
    let [direction, magnitude] = instruction.split(" ");
    magnitude = parseInt(magnitude);

    switch (direction) {
        case "forward":
            horizontal += magnitude;
            vertical += aim * magnitude;
            break;
        case "down":
            aim += magnitude;
            break;
        case "up":
            aim -= magnitude;
            break;
    }
});

console.log(horizontal * vertical);
