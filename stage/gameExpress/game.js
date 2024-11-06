module.exports = function game(playerAction) {
    const gameSelection = ["scissor", "rock", "paper"],
        gameLength = gameSelection.length;

    if (!gameSelection.includes(playerAction)) {
        console.error("玩家猜拳游戏输入不符合要求!请重试!");
        process.exit(0);
    }

    const gameRandom = Math.floor(Math.random() * 3);

    let position = gameRandom + 1;
    if (position === gameLength) position = 0;

    const computerAction = gameSelection[gameRandom];

    console.log(`玩家: ${playerAction}, 电脑: ${computerAction}`);
    if (computerAction === playerAction) {
        console.log("平局!");
        return 0;
    } else if (gameSelection[position] === playerAction) {
        console.log("玩家赢!电脑输!");
        return 1;
    } else {
        console.log("电脑赢!玩家输!");
        return -1;
    }
}
