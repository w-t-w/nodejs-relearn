const path = require('path');
const Koa = require('koa');
const KoaMount = require('koa-mount');
const KoaStatic = require('koa-static');

const client_socket = require('./lib');
const template = require('./template');

const PORT = 3000;

const SOURCE_DIR = path.resolve(__dirname, './source/static');
const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const koa = new Koa();

const detailTemplate = template(TEMPLATE_DIR);

koa.use(KoaMount('/static', KoaStatic(SOURCE_DIR)));

koa.use(KoaMount('/favicon.ico', async function ({response}) {
    response.status = 400;
    response.body = "";
    return false;
}));

koa.use(KoaMount("/", async function ({request, response}) {
    const {column_id} = request.query;
    const result = await new Promise(function (resolve, reject) {
        client_socket.write({
            column_id,
        }, function (err, data) {
            return err ? reject(err) : resolve(data);
        });
    });
    response.status = 200;
    response.body = detailTemplate(result);
}));

koa.listen(PORT, function () {
    console.log(`The client page is running at http://localhost:${PORT}!`);
})

