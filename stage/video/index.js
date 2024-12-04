const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const KoaMount = require('koa-mount');
const KoaStatic = require('koa-static');
const {graphqlHTTP} = require('koa-graphql');

const SOURCE_DIR = path.resolve(__dirname, './source/static/');
const TEMPLATE_DIR = path.resolve(__dirname, './source/index.html');

const schema = require('./schema');

const PORT = 3000;

const koa = new Koa();

koa.use(KoaMount('/api', graphqlHTTP({
    schema
})));

koa.use(KoaMount('/static', KoaStatic(SOURCE_DIR)));

koa.use(KoaMount('/', async function ({request, response}) {
    response.status = 200;
    response.body = fs.readFileSync(TEMPLATE_DIR, 'utf-8');
}));

koa.listen(PORT, function () {
    console.log(`The server is running at http://localhost:${PORT}!`);
});
