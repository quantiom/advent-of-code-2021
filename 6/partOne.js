const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split(",");

for (let i = 0; i < 80; i++) {
    let toAdd = 0;

    for (let j = 0; j < data.length; j++) {
        let newVal = --data[j];
        
        if (newVal < 0) {
            newVal = 6;
            data.push(8);
        }

        data[j] = newVal;
    }

    for (let j = 0; j < toAdd; j++) data.push(8);
}

console.log(data.length);