const vm = require('vm');

const geekBang = "geekBang";
const introduce = `<p>hello, ${geekBang}!</p>`;
console.log(introduce);

const templateMock = "`${_(`<h1>${introduce}</h1>`)}`";
const templateResult = vm.runInNewContext(templateMock, {
    introduce,
    _(markUp) {
        if (!markUp) return markUp;
        return markUp
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&#39;")
            .replace(/"/g, "&quot;");
    }
});
console.log(templateResult);
