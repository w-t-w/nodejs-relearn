const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((request, response) => {
    if (request.url.includes("favicon.ico")) {
        response.writeHead(200);
        response.end();
        return false;
    }
    response.writeHead(200, {'content-type': 'text/html'});
    fs.createReadStream(path.resolve(__dirname, './index.html')).pipe(response);
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});
