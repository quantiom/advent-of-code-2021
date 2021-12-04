// pretty messy, and I forgot to copy the partOne code over before starting partTwo :P

const fs = require("fs");
let data = fs.readFileSync("./data.txt", "utf8").split('\r\n');

const numbersCalled = data[0].split(',').map(e => parseInt(e));
let numberCalledIdx = 0;

// parse the boards
data = data.slice(2);

function parseNumbers(str) {
    let numbers = [];

    for (let i = 0; i < str.length; i += 3) {
        numbers.push(parseInt(str[i] + str[i + 1]));
    }

    return numbers;
}

const boards = [];
let currentBoard = [];

for (let i = 0; i < data.length; i++) {
    if (data[i] == "" || i == data.length - 1) {
        if (i == data.length - 1) currentBoard.push(parseNumbers(data[i]));

        boards.push(currentBoard);
        currentBoard = [];
        continue;
    }

    currentBoard.push(parseNumbers(data[i]));
}

let wonBoards = [];

function checkBoards() {
    let calledNumbers = numbersCalled.slice().splice(0, numberCalledIdx + 1);

    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];

        if (wonBoards.find(e => e.idx == i)) continue;

        // check rows
        for (let row = 0; row < board.length; row++) {
            let validNumbers = [];

            for (let column = 0; column < board[row].length; column++) {
                let value = board[row][column];

                if (calledNumbers.includes(value)) {
                    validNumbers.push(value);
                }
            }

            if (validNumbers.length == board[row].length) {
                wonBoards.push({ idx: i, value: calledNumbers[calledNumbers.length - 1] * boards[i].flat().filter(num => !calledNumbers.includes(num)).reduce((a, c) => a + c, 0) });
            }
        }

        if (wonBoards.find(e => e.idx == i)) continue;

        // check columns (flip)
        for (let row = 0; row < board.length; row++) {
            let validNumbers = [];

            for (let column = 0; column < board[row].length; column++) {
                let value = board[column][row];

                if (calledNumbers.includes(value)) {
                    validNumbers.push(value);
                }
            }

            if (validNumbers.length == board[row].length) {
                wonBoards.push({ idx: i, value: calledNumbers[calledNumbers.length - 1] * boards[i].flat().filter(num => !calledNumbers.includes(num)).reduce((a, c) => a + c, 0) });
            }
        }
    }
}

for (let i = 0; i < numbersCalled.length; i++) {
    numberCalledIdx++;
    checkBoards();
}

console.log(wonBoards[wonBoards.length - 1]);