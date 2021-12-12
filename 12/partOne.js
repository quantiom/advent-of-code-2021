const fs = require("fs");
const data = fs.readFileSync("./data.txt", "utf8").split("\r\n");

const connections = {};

for (const connection of data) {
    const split = connection.split("-");

    const arr = connections[split[0]] || [];
    if (split[1] != "start") arr.push(split[1]);
    connections[split[0]] = arr;

    const reverse = connections[split[1]] || [];
    if (!reverse.includes(split[0]) && split[0] != 'start') reverse.push(split[0]);
    connections[split[1]] = reverse;
}

const usedPaths = [];

goToEnd(["start"], [], true);

function goToEnd(currentPath, usedSmallCaves, partTwo) {
    for (const inner of connections[currentPath[currentPath.length - 1]]) {
        // reached the end
        if (inner == "end") {
            usedPaths.push([...currentPath, "end"]);
            continue;
        }

        const usedSmallCavesCopy = [...usedSmallCaves];
    
        // if the small cave has already been visited in this path
        if (usedSmallCavesCopy.includes(inner)) continue;
        
        // if it's a small cave, add it to the used list
        if (inner.toLowerCase() == inner && inner != "end" && inner != "start") {
            usedSmallCavesCopy.push(inner); 
        }

        goToEnd([...currentPath, inner], usedSmallCavesCopy, true);
    }
}  

console.log(usedPaths.length);