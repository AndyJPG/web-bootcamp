const Campground = require('../models/campground'),
    Comment = require('../models/comment');

// All the middleware
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    // Is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                // Does user own the campgrounds
                // console.log(foundCampground.author.id); // it is a mongoose object
                // console.log(req.user._id); // it is a string
                // Therefore we use equal function below
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission denied!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please login before you can do it!")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next){
    // Is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                // Does user own the Comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission denied!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please login before you can do it!")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect('/login');
}

module.exports = middlewareObj;
