const express = require("express"),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

// Root route
router.get('/', (req, res) => {
    res.render("landing");
});

// ========================
// AUTH ROUTES
// ========================

// show register form
router.get('/register', (req, res) => {
    res.render("register");
})

// handle sign up logic
router.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            // req.flash("error", err);
            console.log(err);
            return res.render('register', {"error": err.message});
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to Yelp Camp " + user.username);
            res.redirect('/campgrounds');
        })
    })
})

// show login form
router.get('/login', (req, res) => {
    res.render('login');
})

// handling login logic
router.post('/login', passport.authenticate("local", {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {

})

// logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect('/campgrounds');
})

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
