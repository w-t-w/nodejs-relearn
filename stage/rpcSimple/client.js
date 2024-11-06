const net = require('net');

const SERVER_HOST = '127.0.0.1';
const PORT = 3000;
const SERVER_PORT = 4000;

const socket = new net.Socket({});

socket.connect({
    host: SERVER_HOST,
    port: SERVER_PORT
});

socket.write("hello GeekBang");
