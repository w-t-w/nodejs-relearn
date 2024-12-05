const net = require('net');

module.exports = class RPC {
    constructor({isReceiveComplete, encode, decode}) {
        this.isReceiveComplete = isReceiveComplete;
        this.encode = encode;
        this.decode = decode;
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
                    const {seq, result} = this.decode(packageBuffer);
                    callback({
                        body: result,
                        socket
                    }, {
                        end: (data) => {
                            const resultBuffer = this.encode(data, seq);
                            socket.write(resultBuffer);
                        }
                    });
                }
            })
        });

        return {
            listen() {
                return tcpServer.listen.apply(tcpServer, arguments);
            }
        }
    }
}
