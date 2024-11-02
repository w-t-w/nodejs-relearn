console.log("start require!");
const lib = require("./lib");
console.log(lib);
console.log("end require!");
lib.test = function () {
    console.log("let's test!");
};
console.log(lib);
lib.test();
lib();
