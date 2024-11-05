const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const querystring = require("querystring");

const game = require("./game");

let errorCode = 0,
    winCount = 0,
    samePlayCount = 0,
    playerLastAction = null;
const PORT = 3000;
const TEMPLATE_DIR = path.resolve(__dirname, "./index.html");
const winCode = 1;
const resultConfig = {
    0: '平局!',
    [winCode]: '你赢了!',
    "-1": '你输了!'
};

const server = http.createServer((request, response) => {
    const {url: requestUrl} = request;
    const {pathname, query} = url.parse(requestUrl);
    if (requestUrl.includes("favicon.ico")) {
        response.writeHead(200);
        response.end();
        return false;
    }
    if (pathname === "/game") {
        const {action} = querystring.parse(query);
        if (winCount >= 3 || errorCode === 9) {
            response.writeHead(500, {'content-type': 'application/json'});
            response.end("我再也不跟你玩儿了!!!");
            return false;
        }
        if (!action || samePlayCount >= 3) {
            response.writeHead(400, {'content-type': 'application/json'});
            response.end("你作弊!!!");
            errorCode = 9;
            return false;
        }
        const result = game(action);
        if (playerLastAction && playerLastAction === action) {
            samePlayCount++;
        } else {
            samePlayCount = 0;
        }
        playerLastAction = action;
        if (result === winCode) winCount++;
        response.writeHead(200, {'content-type': 'application/json'});
        response.end(resultConfig[result]);
    }
    if (pathname === "/") {
        response.writeHead(200, {'content-type': 'text/html'});
        fs.createReadStream(TEMPLATE_DIR).pipe(response);
    }
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
})
