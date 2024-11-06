const path = require("path");
const fs = require("fs");
const koa = require("koa");
const koaMount = require("koa-mount");

const gameKoa = require("./gameKoa");

const PORT = 3000;
const TEMPLATE_DIR = path.resolve(__dirname, "./index.html");

const mainKoa = new koa();

mainKoa.use(
    koaMount("/favicon.ico", async function (ctx) {
        const {response} = ctx;
        response.status = 200;
        response.body = null;
        return false;
    })
);

mainKoa.use(
    koaMount("/game", gameKoa)
);

mainKoa.use(
    koaMount("/", async function ({response}) {
        response.status = 200;
        response.body = fs.readFileSync(TEMPLATE_DIR, "utf-8");
    })
);

mainKoa.listen(PORT, function () {
    console.log(`The server is running at http://localhost:${PORT}!`);
});
