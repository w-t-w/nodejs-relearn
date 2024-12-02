const vm = require('vm');

const geekBang = "geekBang";

const template = {
    templateA: '${_(\`<h1>${include("templateB")}</h1>\`)}',
    templateB: `<p>${geekBang}</p>`
};

const context = vm.createContext({
    include(name) {
        const templateInclude = template[name];
        return templateInclude();
    },
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

Object.entries(template).forEach(([key, value]) => {
    template[key] = vm.runInNewContext(
        `(function() {
                return \`${value}\`;
              })`,
        context
    );
});
const templateAResult = template["templateA"];
console.log(templateAResult());
const templateBResult = template["templateB"];
console.log(templateBResult());
