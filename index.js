const express = require('express');

const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello World from 'GET'!");
});

app.post("/hello", (req, res) => {
    res.send("Hello World from 'POST'!");
});

app.get("/me", (req, res) => {
    const name = req.query.name;
    res.send(name);
});

/**
 * IMPORTANT - 
 * Try to move this API below "/me/:name" and see the behaviour
 * After moving this API below, run the request for "/me/hello?name=<YOUR_NAME>"
 */
app.get("/me/hello", (req, res) => {
    const name = req.query.name;
    res.send(`Hello ${name}!`);
});

app.get("/me/:name", (req, res) => {
    const name = req.params.name;
    res.send(name);
});

app.get("/me/hello/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}!`);
});

app.listen(7050, () => console.log("Listening on port 7050..."));