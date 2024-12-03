const fs = require('fs');
const path = require('path');
const protoBuf = require('protocol-buffers');

const lib = require('./lib');
const columns = require('./mockData/column');

const PROTO_DIR = path.resolve(__dirname, './proto/column.proto');

const schema = protoBuf(fs.readFileSync(PROTO_DIR, 'utf-8'), 'utf-8');

const PORT = 4000;

const server = lib({
    requestSchema: schema.ColumnRequest,
    responseSchema: schema.ColumnResponse
});

const rpcServer = server.createServer(function (request, response) {
    const {body: {column_id}} = request;
    console.log(`请求的极客时间课程 id 为 ${column_id}`);

    response.end({
        columns: columns[0],
        recommend_columns: [columns[1], columns[2]]
    });
});

rpcServer.listen(PORT, function () {
    console.log(`The server is running at http://localhost:${PORT}`);
});


