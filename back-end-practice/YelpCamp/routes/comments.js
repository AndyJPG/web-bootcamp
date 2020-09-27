const express = require("express"),
    router = express.Router({mergeParams: true}), // allow router to merge params defined in app.js
    Campground = require('../models/campground'),
    Comment = require('../models/comment');

// ========================
// COMMENTS ROUTES
// ========================

// Comment new
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

// Comment create
router.post("/", isLoggedIn, (req, res) => {
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
                    console.log(comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

// Comment edit route
router.get("/:comment_id/edit", checkCommentOwnership, function (req, res){
    Comment.findById(req.params.comment_id, function (err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    })
});

// Comment update
router.put("/:comment_id", checkCommentOwnership, function (req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTORY ROUTE
router.delete("/:comment_id", checkCommentOwnership, function (req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function (err){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
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

function checkCommentOwnership(req, res, next){
    // Is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                res.redirect("back");
            } else {
                // Does user own the Comment?
                if(foundComment.author.id.equals(req.user._id)) {
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
