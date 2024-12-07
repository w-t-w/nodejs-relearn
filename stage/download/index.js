const Koa = require('koa');
const KoaMount = require('koa-mount');
const KoaStatic = require('koa-static');
const fs = require('fs');
const path = require('path');

const leak = [];

const PORT = 3000;

const SOURCE_DIR = path.join(__dirname, './source/static');
const TEMPLATE_DIR = path.resolve(__dirname, './source/index.html');

const buffer = fs.readFileSync(TEMPLATE_DIR);

const koa = new Koa();

koa.use(
    KoaMount('/static', KoaStatic(SOURCE_DIR))
);

koa.use(
    KoaMount("/favicon.ico", async function ({response}) {
        response.status = 400;
        response.body = "";
        return false;
    })
);

koa.use(
    KoaMount("/", async function ({response}) {
        response.status = 200;
        // response.type = 'html';
        leak.push(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
        response.body = fs.readFileSync(TEMPLATE_DIR, 'utf-8');
    })
);

koa.listen(PORT, function () {
    console.log(`The client page is running at http://localhost:${PORT}!`);
});




