const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const leak = [];

const TEMPLATE_DIR = path.resolve(__dirname, './source/index.html');

const server = http.createServer((req, res) => {
    // window.location.href = "http://localhost:3000/";
    // const file = fs.readFileSync(TEMPLATE_DIR, 'utf-8');
    // leak.push(file);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
});

server.listen(3000, function () {
    console.log(`The server is running at http://localhost:${PORT}!`);
    while(true) {}
});
