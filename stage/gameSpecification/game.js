// 遵从 commonjs 规范的石头、剪刀、布的猜拳游戏
module.exports = function game(playerAction) {
    const computerRandom = Math.floor(Math.random() * 3);

    const gameSelection = ["scissor", "rock", "paper"];
    const gameLength = gameSelection.length;

    const computerAction = gameSelection[computerRandom];

    let position = computerRandom + 1;
    if (position === gameLength) position = 0;

    console.log(`玩家: ${playerAction}, 电脑: ${computerAction}`);
    if (playerAction === computerAction) {
        console.log("平局!");
        return 0;
    } else if (gameSelection[position] === playerAction) {
        console.log("玩家赢!电脑输");
        return 1;
    } else {
        console.log("电脑赢!玩家输!");
        return -1;
    }
};
