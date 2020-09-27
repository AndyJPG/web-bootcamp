const express = require("express"),
    router = express.Router(),
    Campground = require('../models/campground'),
    middleware = require('../middleware/index'); // by default the require will use index file, so we can also just require the directory

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
router.post('/', middleware.isLoggedIn, (req, res) => {
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
router.get("/new", middleware.isLoggedIn, (req, res) => {
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

// Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res){
    Campground.findByIdAndRemove(req.params.id, function (err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;
