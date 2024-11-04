const game = require('./game');

let count = 0;

console.log("猜拳游戏正式开始!石头、剪刀、布!");

console.log("请出示你的猜拳(scissor、rock or paper):");
process.stdin.on("data", data => {
    const playerAction = data.toString().trim();
    const result = game(playerAction);
    if (result === 1) {
        count++;
    }
    if (count === 3) {
        console.log("你太厉害了!我不跟你玩儿了!");
        process.exit(0);
    }
    console.log("请继续出示你的猜拳:");
});
