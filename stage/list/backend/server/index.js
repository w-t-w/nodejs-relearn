const path = require('path');
const fs = require('fs');
const protoBuf = require('protocol-buffers');

const columns = require('./data/column');
const tcpServer = require('./lib');

const sortConfig = {
    1: (a, b) => {
        return a.id - b.id;
    },
    2: (a, b) => {
        return a.sub_count - b.sub_count;
    },
    3: (a, b) => {
        return a.column_price - b.column_price;
    }
};

const FILTER_NONE = 0;

const PORT = 4000;

const PROTO_DIR = path.resolve(__dirname, '../proto/column.proto');

const schema = protoBuf(fs.readFileSync(PROTO_DIR, 'utf-8'), 'utf-8');

const server = tcpServer({
    requestSchema: schema.ColumnRequest,
    responseSchema: schema.ColumnResponse
});

server.createServer((request, response) => {
    const {body} = request;
    const {
        sort,
        filter
    } = body;
    response.end({
        columns: columns.sort(sortConfig[sort]).filter(column => filter === FILTER_NONE ? column : column.type === filter)
    });
}).listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});


