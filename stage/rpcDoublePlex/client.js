const net = require("net");

const CLIENT_HOST = "127.0.0.1";
const SERVER_PORT = 4000;

const socket = new net.Socket({});

socket.connect({
    host: CLIENT_HOST,
    port: SERVER_PORT,
})

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
];

const lesson_id_length = LESSON_IDS.length;
let index = 0,
    oldBuffer = null,
    packageLength = null,
    id = null,
    seq = 0;

socket.on("data", function (buffer) {
    if (oldBuffer) {
        buffer = Buffer.concat([oldBuffer, buffer]);
    }
    while (packageLength = isCompletePackage(buffer)) {
        const package = buffer.slice(0, packageLength);
        buffer = buffer.slice(packageLength);
        const {seq, data} = decode(package);
        console.log(`包头为 ${seq} 的课程名称为 ${data}`);
    }
    oldBuffer = buffer;
});

function isCompletePackage(buffer) {
    if (buffer <= 8) return 0;
    const body_length = buffer.readInt32BE(4);
    return 8 + body_length;
}

function decode(buffer) {
    const header = buffer.slice(0, 8);
    const seq = header.readInt32BE();
    const body = buffer.slice(8);
    return {
        seq,
        data: body.toString()
    }
}

function encode(id) {
    const header = Buffer.alloc(8);
    header.writeInt32BE(seq);
    const body = Buffer.alloc(4);
    body.writeInt32BE(id);
    const body_length = body.length;
    header.writeInt32BE(body_length, 4);
    console.log(`包头为 ${seq} 的课程 ID 为 ${id}`);
    seq++;
    return Buffer.concat([header, body]);
}

for (let i = 0; i < 200; i++) {
    index = Math.floor(Math.random() * lesson_id_length);
    id = LESSON_IDS[index];
    socket.write(encode(id));
}
