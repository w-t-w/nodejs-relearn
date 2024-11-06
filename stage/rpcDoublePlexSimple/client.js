const net = require("net");

const CLIENT_HOST = '127.0.0.1';
const SERVER_PORT = 4000;

const socket = new net.Socket({});

socket.connect({
    host: CLIENT_HOST,
    port: SERVER_PORT,
});

const LESSON_IDS = [
    "136797",
    "136798",
    "136799",
    "136800",
    "136801",
    "136803",
    "136804",
    "136806",
    "136807",
    "136808",
    "136809",
    "141994",
    "143517",
    "143557",
    "143564",
    "143644",
    "146470",
    "146569",
    "146582"
]

const lesson_id_length = LESSON_IDS.length;

let index = 0,
    seq = 0,
    id = null;

socket.on("data", function (buffer) {
    const {seq, data} = decode(buffer);
    console.log(`包头 ${seq} 所代表的课程 id 为 ${id} 的课程名称为 ${data}`);
});

function encode(id) {
    const header = Buffer.alloc(4);
    header.writeInt32BE(seq);
    const body = Buffer.alloc(4);
    body.writeInt32BE(id);
    console.log(`包头 ${seq} 所代表的课程 id 为 ${id}`);
    seq++;
    return Buffer.concat([header, body]);
}

function decode(buffer) {
    const seq = buffer.readInt32BE();
    const body = buffer.slice(4);
    return {
        seq,
        data: body.toString()
    }
}

// setInterval(function () {
for (let i = 0; i < 200; i++) {
    index = Math.floor(Math.random() * lesson_id_length);
    id = LESSON_IDS[index];
    socket.write(encode(id));
}
// }, 1000);
