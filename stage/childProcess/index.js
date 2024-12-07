const cp = require('child_process');
const path = require('path');
const child_process = cp.fork(path.resolve(__dirname, './child.js'));

console.log(`parent send haha!`);
child_process.send('haha');
child_process.on('message', (msg) => {
    console.log(`parent receive ${msg}!`);
});
