const EasySock = require('easy_sock');
const fs = require('fs');
const path = require('path');
const protoBuf = require('protocol-buffers');

const PACKAGE_HEADER_LENGTH = 8;
const PACKAGE_SEQ_LENGTH = 4;

const IP = '127.0.0.1';
const PORT = 4000;
const TIMEOUT = 3000;

const PROTO_DIR = path.resolve(__dirname, '../../proto/column.proto');

const schema = protoBuf(fs.readFileSync(PROTO_DIR, 'utf-8'), 'utf-8');

const socket = new EasySock({
    ip: IP,
    port: PORT,
    timeout: TIMEOUT,
    keepAlive: true,
});

socket.isReceiveComplete = (buffer) => {
    if (buffer.length <= PACKAGE_HEADER_LENGTH)
        return 0;
    const bodyLength = buffer.readInt32BE(PACKAGE_SEQ_LENGTH);
    return PACKAGE_HEADER_LENGTH + bodyLength;
};

socket.encode = (data, seq) => {
    const body = schema.ColumnRequest.encode(data);
    const header = Buffer.alloc(PACKAGE_HEADER_LENGTH);
    header.writeInt32BE(seq);
    header.writeInt32BE(body.length, PACKAGE_SEQ_LENGTH);
    return Buffer.concat([header, body]);
};

socket.decode = (buffer) => {
    const seq = buffer.readInt32BE();
    const body = buffer.slice(PACKAGE_HEADER_LENGTH);
    const result = schema.ColumnResponse.decode(body);
    return {
        result,
        seq
    };
};

module.exports = socket;
