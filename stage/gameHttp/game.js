module.exports = function game(playerAction) {
    const computerRandom = Math.floor(Math.random() * 3);

    const gameSelection = ["scissor", "rock", "paper"],
        length = gameSelection.length;

    const computerAction = gameSelection[computerRandom];

    let position = computerRandom + 1;
    if (position === length) position = 0;

    console.log(`玩家: ${playerAction}, 电脑: ${computerAction}`);
    if (computerAction === playerAction) {
        console.log("平局!");
        return 0;
    } else if (playerAction === gameSelection[position]) {
        console.log("玩家赢!电脑输!");
        return 1;
    } else {
        console.log("电脑赢!玩家输!");
        return -1;
    }
};
