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

    if (req.url.startsWith('/me')) {

        const urlAfterSlashMe = req.url.substr(3);

        if (urlAfterSlashMe.startsWith("?")) {
            // The requested url was "/me?name=<ANY_STRING>"
            const namePart = urlAfterSlashMe.substr(6);
            res.write(namePart);
            res.end();
        }
        else {
            // The requested url was something like "/me/<ANY_STRING>"
            const namePart = urlAfterSlashMe.substr(1);
            res.write(namePart);
            res.end();
        }
    }
});

server.listen(7050);