const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\r\n");

let paper = [];

let maxX = 0;
let maxY = 0;

for (const point of data) {
    if (point == "") {
        for (let y = 0; y < maxY + 1; y++) {
            paper.push(new Array(maxX + 1).fill(0));
        }

        for (const point2 of data) {
            if (point2 == "") break;

            const [x, y] = point2.split(",").map((e) => parseInt(e));
            paper[y][x] = 1;
        }
    } else if (point.startsWith("fold along ")) {
        let [axis, value] = point.split("fold along ")[1].split("=");
        value = parseInt(value);

        if (axis == "y") {
            let bottomHalf = [];

            for (let y = value + 1; y < paper.length; y++) {
                bottomHalf.push(paper[y]);
            }

            paper = paper.splice(0, value);
            bottomHalf = bottomHalf.reverse();

            const offset = paper.length - bottomHalf.length;

            for (let y = 0; y < bottomHalf.length; y++) {
                for (let x = 0; x < bottomHalf[y].length; x++) {
                    if (!paper[y + offset][x])
                        paper[y + offset][x] = bottomHalf[y][x];
                }
            }
        } else if (axis == "x") {
            let newPaper = [];
            let rightHalf = [];

            for (let y = 0; y < paper.length; y++) {
                const firstHalf = [];
                const secondHalf = [];

                for (let x = 0; x < paper[y].length; x++) {
                    if (x > value) {
                        secondHalf.push(paper[y][x]);
                    } else if (x < value) {
                        firstHalf.push(paper[y][x]);
                    }
                }

                newPaper.push(firstHalf);
                rightHalf.push(secondHalf);
            }

            paper = newPaper;
            rightHalf = rightHalf.map((e) => e.reverse());

            const offset = newPaper.length - rightHalf.length;

            for (let y = 0; y < paper.length; y++) {
                for (let x = 0; x < paper[y].length; x++) {
                    if (!paper[y][x] && x >= offset) {
                        paper[y][x] = rightHalf[y][x - offset];
                    }
                }
            }
        }

        break; // stop after first fold (part 1)
    } else {
        let [x, y] = point.split(",").map((e) => parseInt(e));

        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }
}

console.log(paper.reduce((a, c) => a + c.reduce((aa, cc) => aa + cc, 0), 0));
