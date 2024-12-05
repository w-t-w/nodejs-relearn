const Koa = require('koa');
const KoaMount = require('koa-mount');
const KoaStatic = require('koa-static');
const path = require('path');
const {renderToString} = require('react-dom/server');

const clientServer = require('./lib');
const template = require('../template');
const App = require('../build/ssr_index');

const PORT = 3000;

const SOURCE_DIR = path.resolve(__dirname, '../template/source/static');
const TEMPLATE_DIR = path.resolve(__dirname, '../template/source/index.html');

const koa = new Koa();

const detailTemplate = template(TEMPLATE_DIR);

koa.use(KoaMount('/static', KoaStatic(SOURCE_DIR)));

koa.use(KoaMount('/api', async function ({request, response}) {
    const {sort = 0, filter = 0} = request.query;

    const sortResult = +(sort || 0);
    const filterResult = +(filter || 0);

    const result = await new Promise((resolve, reject) => {
        clientServer.write({
            sort: sortResult,
            filter: filterResult
        }, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    });

    response.status = 200;
    response.body = result;
}));

koa.use(KoaMount('/', async function ({request, response}) {
    const {sort = 0, filter = 0} = request.query;

    const result = await new Promise((resolve, reject) => {
        clientServer.write({
            sort,
            filter
        }, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    });
    const initialString = renderToString(App({columns: result.columns}));

    response.status = 200;
    response.body = detailTemplate({
        initialString,
        initialData: result,
        initialSort: sort,
        initialFilter: filter
    });
}));

koa.listen(PORT, () => {
    console.log(`The client server is running at http://localhost:${PORT}!`);
});
