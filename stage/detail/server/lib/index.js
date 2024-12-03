const RPC = require('./rpc');

const PACKAGE_HEADER_LENGTH = 8;
const PACKAGE_SEQ_LENGTH = 4;


module.exports = function ({requestSchema, responseSchema}) {
    return new RPC({
        encode(data, seq) {
            const body = responseSchema.encode(data);
            const header = Buffer.alloc(8);
            header.writeInt32BE(seq);
            const body_length = body.length;
            header.writeInt32BE(body_length, PACKAGE_SEQ_LENGTH);
            return Buffer.concat([header, body]);
        },
        decode(buffer) {
            const seq = buffer.readInt32BE();
            const body = buffer.slice(8);
            const result = requestSchema.decode(body);
            return {
                result,
                seq
            };
        },
        isReceiveComplete(buffer) {
            if (buffer.length <= PACKAGE_HEADER_LENGTH)
                return 0;
            const bodyLength = buffer.readInt32BE(PACKAGE_SEQ_LENGTH);
            return PACKAGE_HEADER_LENGTH + bodyLength;
        }
    });
};
