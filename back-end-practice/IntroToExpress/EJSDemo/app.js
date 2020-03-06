const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/fallinlovewith/:thing", (req, res) => {
    const thing = req.params.thing;
    res.render('love', {thingVar: thing});
})

app.get('/posts', (req, res) => {
    const posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Hello there", author: "ANyd"},
        {title: "Hi whwafe", author: "Ssdfadfa"}
    ];

    res.render("posts", {posts: posts});
});

app.listen(port, () => {
    console.log("Server is listening in port" + port);
});
