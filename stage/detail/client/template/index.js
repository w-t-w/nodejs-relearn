const vm = require('vm');
const fs = require('fs');

const templateMap = {};

const context = vm.createContext({
    include(name, data) {
        const template = templateMap[name] || createTemplate(name);
        return template(data);
    }
});

function createTemplate(name) {
    templateMap[name] = vm.runInNewContext(`
        (function(data) {
            with(data) {
                return \`${fs.readFileSync(name, 'utf-8')}\`;
            }
        })
    `, context);
    return templateMap[name];
}

module.exports = createTemplate;
