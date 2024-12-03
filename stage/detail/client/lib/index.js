const fs = require('fs');
const path = require('path');
const protoBuf = require('protocol-buffers');
const EasySock = require('easy_sock');

const PORTO_DIR = path.resolve(__dirname, '../proto/column.proto');

const IP = '127.0.0.1';
const PORT = 4000;
const TIMEOUT = 5000;

const PACKAGE_HEADER_LENGTH = 8;
const PACKAGE_SEQ_LENGTH = 4;

const schema = protoBuf(fs.readFileSync(PORTO_DIR, 'utf-8'), 'utf-8');

const socket = new EasySock({
    ip: IP,
    port: PORT,
    timeout: TIMEOUT,
    keepAlive: true,
});

socket.encode = function (data, seq) {
    const body = schema.ColumnRequest.encode(data);
    const header = Buffer.alloc(PACKAGE_HEADER_LENGTH);
    header.writeInt32BE(seq);
    const body_length = body.length;
    header.writeInt32BE(body_length, PACKAGE_SEQ_LENGTH);
    return Buffer.concat([header, body]);
};

socket.decode = function (buffer) {
    const seq = buffer.readInt32BE();
    const body = buffer.slice(PACKAGE_HEADER_LENGTH);
    const result = schema.ColumnResponse.decode(body);
    return {
        result,
        seq
    };
};

socket.isReceiveComplete = function (buffer) {
    if (buffer.length <= PACKAGE_HEADER_LENGTH)
        return 0;
    const bodyLength = buffer.readInt32BE(PACKAGE_SEQ_LENGTH);
    return PACKAGE_HEADER_LENGTH + bodyLength;
};

module.exports = socket;
