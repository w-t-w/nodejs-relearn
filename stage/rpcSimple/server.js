const net = require("net");

const PORT = 4000;

const server = net.createServer(function (socket) {
    socket.on("data", function (buffer) {
        console.log('result:', buffer.toString());
    });
});

server.listen(PORT, function () {
    console.log(`The server is running at http://localhost:${PORT}!`);
});
