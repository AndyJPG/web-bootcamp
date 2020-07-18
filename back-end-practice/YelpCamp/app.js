const express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");

const Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://0.0.0.0:27017/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

// Seeds database
// seedDB()

// RESTFUL ROUTES
//
//name      url         verb        desc.
// ================================================
// INDEX    /dogs       GET         Display a list of all dogs
// NEW      /dogs/new   GET         Display form to make a new dog
// CREATE   /dogs       POST        Add new dog to database


app.get('/', (req, res) => {
    res.render("landing");
});

//INDEX
app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });

});

//CREATE
app.post('/campgrounds', (req, res) => {
    const { name, imageUrl, description } = req.body;
    const newCampGround = {name: name, image: imageUrl, description: description};

    Campground.create(newCampGround, (err, newCamp) => {
       if(err) {
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
    });
});

//NEW
app.get("/campgrounds/new", (req, res) => {
   res.render('campgrounds/new');
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, camp) => {
       if(err) {
           console.log(err);
       } else {
           res.render("campgrounds/show", {campground: camp});
       }
    });
});

// ========================
// COMMENTS ROUTES
// ========================

app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
