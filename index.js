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
        else if (urlAfterSlashMe.startsWith('/hello')) {

            const urlAfterSlashHello = urlAfterSlashMe.substr(6);

            if (urlAfterSlashHello.startsWith("?")) {
                // The requested url was "/me/hello"
                /**
                 * This URL will have query parameters. Like - 
                 * "/me/hello?name=<ANY_STRING>"
                 * So, we have to extract that from our url.
                 */
                const namePart = urlAfterSlashHello.substr(6);
                res.write(`Hello ${namePart}!`);
                res.end();
            }
            else {
                // The requested url was "/me/hello/<ANY_STRING>"
                const namePart = urlAfterSlashHello.substr(1);
                res.write(`Hello ${namePart}!`);
                res.end();
            }
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