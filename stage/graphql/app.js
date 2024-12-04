const graphqlApp = require('./index');

graphqlApp('{ hello }').then((result) => {
    console.log(result);
    console.log(result.data);
    console.log(result.data.hello);
});
