const argv = process.argv,
    length = argv.length;
let position = 0;

const playerAction = argv[length - 1];

const computerRandom = Math.floor(Math.random() * 3);
const gameSelections = ["scissor", "rock", "paper"];

position = computerRandom + 1;
if(position === length) position = 0;

const computerAction = gameSelections[computerRandom];

console.log(`玩家: ${playerAction}, 电脑: ${computerAction}`);
if(playerAction === computerAction) {
    console.log("平局!");
} else if (gameSelections[position] === playerAction) {
    console.log("玩家赢!电脑输!");
} else {
    console.log("电脑赢!玩家输!");
}

