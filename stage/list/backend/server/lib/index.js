const RPC = require('./rpc');

const PACKAGE_HEADER_LENGTH = 8;
const PACKAGE_SEQ_LENGTH = 4;

module.exports = ({requestSchema, responseSchema}) => {
    return new RPC({
        isReceiveComplete(buffer) {
            if (buffer.length <= PACKAGE_HEADER_LENGTH)
                return 0;
            const bodyLength = buffer.readInt32BE(PACKAGE_SEQ_LENGTH);
            return PACKAGE_HEADER_LENGTH + bodyLength;
        },
        encode(data, seq) {
            const body = responseSchema.encode(data);
            const header = Buffer.alloc(PACKAGE_HEADER_LENGTH);
            header.writeInt32BE(seq);
            header.writeInt32BE(body.length, PACKAGE_SEQ_LENGTH);
            return Buffer.concat([header, body]);
        },
        decode(buffer) {
            const seq = buffer.readInt32BE();
            const body = buffer.slice(PACKAGE_HEADER_LENGTH);
            const result = requestSchema.decode(body);
            return {
                seq,
                result
            };
        }
    });
};
