const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressSanitizer = require('express-sanitizer')
    // Method override to get the method in query
    methodOverride = require("method-override");

// APP CONFIG
mongoose.connect("mongodb://0.0.0.0:27017/restful_blog_app");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
// Sanitizer need to be after the body parser
app.use(expressSanitizer())
// Use method override to get "_method" and to treat as the request it equal to
app.use(methodOverride("_method"));

// MONGOOSE/BLOG CONFIG
const blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

app.get("/", (req, res) => {
    res.redirect('/blogs');
});

// INDEX ROUTES
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log(err)
        } else {
            res.render("index", {blogs: blogs});
        }
    });

});

// NEW ROUTES
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// CREATE ROUTES
app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
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

// EDIT ROUTE
app.get('/blogs/:id/edit', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            console.log(err);
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: blog});
        }
    });
});

// UPDATE ROUTE
// HTML FORM DON'T SUPPORT PUT REQUEST
app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id)
        }
    })

});

// DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})

app.listen(3000, () => {
    console.log("Server running at port 3000");
});
