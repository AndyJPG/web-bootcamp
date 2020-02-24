const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000

let friends = ["Tome", "Andy", "Hello", "Claire"];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.post('/addfriend', (req, res) => {
    console.log(req.body);
    const newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", (req, res) => {
    res.render("friends", {friends: friends});
});

app.listen(port, () => {
    console.log(`Server listen to port ${port}`);
});
