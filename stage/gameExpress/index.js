const express = require("express");
const fs = require("fs");
const path = require("path");

const game = require("./game");

const PORT = 3000;
const TEMPLATE_DIR = path.resolve(__dirname, './index.html');

let playerSameCount = 0,
    errorCode = 0,
    playerWonCount = 0,
    playerLastAction = null;

const playerWon = 1;

const resultConfig = {
    "-1": "你输了!",
    0: "平局!",
    1: "你赢了!"
};

const app = express();

app.use("/favicon.ico", function (request, response) {
    response.status(200);
    response.send();
    return false;
});

app.use("/game", function (request, response) {
    const {action} = request.query;

    if (playerWonCount >= 3 || errorCode === 9) {
        response.status(500);
        response.send("你太厉害了!!!我不跟你玩儿了!!!");
        return false;
    }

    if (!action || playerSameCount >= 3) {
        response.status(400);
        response.send("你作弊!!!");
        errorCode = 9;
        return false;
    }

    if (playerLastAction && playerLastAction === action) {
        playerSameCount++;
    } else {
        playerSameCount = 0;
    }
    playerLastAction = action;

    const result = game(action);

    if (result === playerWon) playerWonCount++;

    response.status(200);
    response.send(resultConfig[result]);
});

app.use("/", function (request, response) {
    response.status(200);
    response.send(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
});

app.listen(PORT, function () {
    console.log(`The server is running at http://localhost:${PORT}!`);
});

