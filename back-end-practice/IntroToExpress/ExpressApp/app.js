const express = require('express');
const app = express();
const port = 4000;

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/bye', (req, res) => {
    res.send("bye")
});

app.get('/r/:subName/comments/:id/:title', (req, res) => {
   res.send('hello');
});

app.get('*', (req, res) => {
    res.send('any request');
});

app.listen(port, () => console.log(`Server is running in port ${port}`));
