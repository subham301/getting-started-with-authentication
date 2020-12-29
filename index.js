const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === '/hello') {
        res.write("Hello World from 'GET'!");
        res.end();
    }

    if (req.method === "POST" && req.url === '/hello') {
        res.write("Hello World from 'POST'!");
        res.end();
    }
});

server.listen(7050);