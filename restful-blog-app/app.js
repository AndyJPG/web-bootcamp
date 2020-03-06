const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/restful_blog_app");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/restful-blog-app/public"));
app.use(bodyParser.urlencoded({extended: true}));

const blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/", (req, res) => {
    res.redirect('/blogs');
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log(err)
        } else {
            res.render("index", {blogs: blogs});
        }
    });

});


app.listen(3000, () => {
    console.log("Server running at port 3000");
});
