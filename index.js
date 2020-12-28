const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/hello') {
        res.write('Hello World!');
        res.end();
    }
});

server.listen(7050);