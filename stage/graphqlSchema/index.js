const Koa = require('koa');
const {graphqlHTTP} = require('koa-graphql');

const schema = require('./schema');

const PORT = 3000;

const koa = new Koa();

koa.use(graphqlHTTP({
    schema,
}));

koa.listen(PORT, function () {
    console.log(`The server is running at http://localhost:${PORT}!`);
});
