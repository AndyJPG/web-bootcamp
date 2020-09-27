const express = require("express"),
    router = express.Router({mergeParams: true}), // allow router to merge params defined in app.js
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleware = require('../middleware');

// ========================
// COMMENTS ROUTES
// ========================

// Comment new
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

// Comment create
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    // Add username and it to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

// Comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res){
    Comment.findById(req.params.comment_id, function (err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    })
});

// Comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTORY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function (err){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;
