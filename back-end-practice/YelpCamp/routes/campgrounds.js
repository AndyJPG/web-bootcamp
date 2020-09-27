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

// Edit campground route
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update campground route
router.put("/:id", checkCampgroundOwnership, function (req, res) {
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
router.delete("/:id", checkCampgroundOwnership, function (req, res){
    Campground.findByIdAndRemove(req.params.id, function (err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next) {
    // Is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                res.redirect("back");
            } else {
                // Does user own the campgrounds
                // console.log(foundCampground.author.id); // it is a mongoose object
                // console.log(req.user._id); // it is a string
                // Therefore we use equal function below
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;
