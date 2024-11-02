console.log("hello world!");

exports.name = "Gary";
exports.foo = function (a, b) {
    return a + b;
};
exports.geekBang = "hello geekBang!";
const timer = setTimeout(() => {
    console.log(exports);
    exports.test();
    clearTimeout(timer);
}, 2000);
module.exports = function () {
    console.log("That's real build!");
};
