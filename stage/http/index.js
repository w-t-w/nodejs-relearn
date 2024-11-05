const http = require('http');

const PORT = 3000;

const server = http.createServer((request, response) => {
    response.writeHead(200, {'content-type': 'text/html'});
    response.end("hello world!");
});
server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});
