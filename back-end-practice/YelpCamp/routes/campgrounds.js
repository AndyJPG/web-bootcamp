const express = require("express"),
    router = express.Router(),
    Campground = require('../models/campground');

//INDEX
router.get('/', (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });

});

//CREATE
router.post('/', isLoggedIn, (req, res) => {
    const { name, imageUrl, description } = req.body;
    const author = {id: req.user._id, username: req.user.username};
    const newCampGround = {name: name, image: imageUrl, description: description, author: author};

    Campground.create(newCampGround, (err, newCamp) => {
        if(err) {
            console.log(err);
        } else {
            // redirect back to campgrounds pages
            res.redirect("/campgrounds");
        }
    });
});

//NEW
router.get("/new", isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, camp) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: camp});
        }
    });
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
