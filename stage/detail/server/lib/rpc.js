const net = require('net');

module.exports = class RPC {
    constructor({encode, decode, isReceiveComplete}) {
        this.encode = encode;
        this.decode = decode;
        this.isReceiveComplete = isReceiveComplete;
    }

    createServer(callback) {
        const tcpServer = net.createServer((socket) => {
            let buffer = null,
                packageBuffer = null,
                packageLength = 0;
            socket.on("data", (data) => {
                buffer = (buffer && buffer.length > 0) ? Buffer.concat([buffer, data]) : data;
                while (buffer && (packageLength = this.isReceiveComplete(buffer))) {
                    if (buffer.length === packageLength) {
                        packageBuffer = buffer;
                        buffer = null;
                    } else {
                        packageBuffer = buffer.slice(0, packageLength);
                        buffer = buffer.slice(packageLength);
                    }
                    const {result, seq} = this.decode(packageBuffer);
                    // request 请求 与 response 响应
                    callback({
                        body: result,
                        socket,
                    }, {
                        end: (data) => {
                            const responseSchemaBuffer = this.encode(data, seq);
                            socket.write(responseSchemaBuffer);
                        }
                    });
                }
            });
        });

        return {
            listen() {
                return tcpServer.listen.apply(tcpServer, arguments);
            }
        };
    }
};
