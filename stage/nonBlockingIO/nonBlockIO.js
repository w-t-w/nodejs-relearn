const glob = require("glob");

let result = null;

console.time('glob');
glob(`${process.cwd()}/**/*`, function callback(err, data) {
    result = data;
    console.log('got result:', result);
});
console.timeEnd('glob');
console.log(100 + 1);
