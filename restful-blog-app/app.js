const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require("method-override");

mongoose.connect("mongodb://127.0.0.1:27017/restful_blog_app");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

app.get("/blogs/new", (req, res) => {
    res.render("new");
});

app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            res.redirect("/blogs");
            console.log(err);
        } else {
            res.render("show", {blog: blog});
        }
    });
});

app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            console.log(err);
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: blog});
        }
    });
});

app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {

    })
});

app.listen(3000, () => {
    console.log("Server running at port 3000");
});
