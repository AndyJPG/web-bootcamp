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
router.post('/', (req, res) => {
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
router.get("/new", (req, res) => {
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

module.exports = router;
