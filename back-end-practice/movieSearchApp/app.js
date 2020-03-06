const express = require('express');
const app = express();
const request = require('request');
const port = 3000;

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
    res.render('search');
})

app.get('/results', (req, res) => {
    const { movieName } = req.query;
    console.log(movieName);

    request(`http://www.omdbapi.com/?s=${movieName}&apikey=thewdb`, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            const parsedBody = JSON.parse(body);
            res.render('results', {data: parsedBody['Search']});
        }
    });
});

app.listen(port, () => {
    console.log('Movie App running in port ' + port);
});
