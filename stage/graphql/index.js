const {graphql, buildSchema} = require("graphql");

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => `Hello GeekBang!`
};

// graphql({schema, source: '{ hello }', rootValue: root}).then(result => {
//     console.log(result);
//     console.log(result.data.hello);
// });

module.exports = function (query) {
    return graphql({schema, source: query, rootValue: root});
};
