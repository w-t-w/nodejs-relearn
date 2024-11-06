const game = require("./game");

const koa = require("koa");
const gameKoa = new koa();

let errorCode = 0,
    playerSameCount = 0,
    playerWonCount = 0,
    playerLastAction = null;

const playerWonCode = 1;

const resultConfig = {
    "-1": "你输了!",
    0: "平局!",
    1: "你赢了!"
};

gameKoa.use(async function (ctx, next) {
    const {response} = ctx;

    if (playerWonCount >= 3 || errorCode === 9) {
        response.status = 500;
        response.body = "你太厉害了!我不跟你玩儿了!";
        return false;
    }

    await next();

    if (ctx.playerWon) playerWonCount++;
});

gameKoa.use(async function (ctx) {
    const {request, response} = ctx;
    const {action} = request.query;

    if (!action || playerSameCount >= 3) {
        response.status = 400;
        response.body = "你作弊!!!";
        errorCode = 9;
        return false;
    }

    if (playerLastAction && playerLastAction === action) {
        playerSameCount++;
    } else {
        playerSameCount = 0;
    }
    playerLastAction = action;

    await new Promise(function (resolve) {
        const timer = setTimeout(function () {
            const result = game(action);

            if (playerWonCode === result) ctx.playerWon = true;

            response.status = 200;
            response.body = resultConfig[result];
            resolve();
            clearTimeout(timer);
        }, 100);
    });
});

module.exports = gameKoa;

