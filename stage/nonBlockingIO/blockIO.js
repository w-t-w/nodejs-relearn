const glob = require("glob");

console.time("glob");
const result = glob.sync(`${process.cwd()}/**/*`);
console.timeEnd("glob");
console.log('result: ', result);
