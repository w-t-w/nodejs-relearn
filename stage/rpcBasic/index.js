const fs = require("fs");
const path = require("path");
const protoBuf = require("protocol-buffers");

const PROTO_DATA_DIR = path.resolve(__dirname, "./data/demo.proto");

const schema = protoBuf(fs.readFileSync(PROTO_DATA_DIR, "utf-8"));

const buffer_first = Buffer.from("hello geekBang");
const buffer_ano = Buffer.from([1, 2, 3, 4]);
const buffer_third = Buffer.alloc(20);

console.log(buffer_first);
console.log(buffer_ano);
console.log(buffer_third);

buffer_ano.writeInt8(12, 1);
// buffer_ano.writeInt16BE(512, 2);
buffer_ano.writeInt16LE(512, 2);

console.log(buffer_ano);

const lesson = {
    id: 136797,
    name: "01 | 课程介绍",
    price: 89.4
};

const encode_buffer = schema.Column.encode(lesson);
console.log(encode_buffer);
const decode_lesson = schema.Column.decode(encode_buffer);
console.log(decode_lesson);
