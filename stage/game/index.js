const params = process.argv,
    length = params.length;
let position = 0;

const playerAction = params[length - 1];

const computerRandom = Math.floor(Math.random() * 3);

const gameSelections = ["scissor", "rock", "paper"];

const computerAction = gameSelections[computerRandom];

position = computerRandom + 1;
if (position === length) position = 0;

console.log(`玩家: ${playerAction}, 电脑: ${computerAction}`);
console.log("结果: ");

if (playerAction === computerAction) {
    console.log("平局!");
} else if (gameSelections[position] === playerAction) {
    console.log("玩家赢!电脑输!");
} else {
    console.log("电脑赢!玩家输!");
}
