const net = require("net");

const CLIENT_HOST = "127.0.0.1";
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
];
const lesson_id_length = LESSON_IDS.length;
let index = Math.floor(Math.random() * lesson_id_length),
    id = LESSON_IDS[index],
    buffer = Buffer.alloc(4);

buffer.writeInt32BE(id);
socket.write(buffer);

socket.on("data", function (buffer_result) {
    console.log(`课程 id 为 ${id} 所代表的课程名称为: ${buffer_result.toString()}`);

    index = Math.floor(Math.random() * lesson_id_length);
    id = LESSON_IDS[index];
    buffer = Buffer.alloc(4);
    buffer.writeInt32BE(id);
    socket.write(buffer);
});
