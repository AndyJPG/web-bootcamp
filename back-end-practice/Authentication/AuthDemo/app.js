const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

const User = require("./model/user");

mongoose.connect("mongodb://0.0.0.0:27017/author")

app.use(require("express-session")({
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

// the user authenticate() comes from passportLocalMongoose plugin in user model
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==========
// ROUTES
// ==========

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
})

// AUTH ROUTES

// show sign up form
app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", (req, res) => {
    // not putting password into user is because we are not actually going to put password into database
    // instead hash with username and store a hash key
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect('/secret');
        });
    })
})

// LOGIN ROUTES

// render login form
app.get("/login", (req, res) => {
    res.render("login");
})

// login logic
// middleware: code run before final call back
// when go to the route it will run middleware immediately, passport authenticate in this case.
app.post('/login', passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {

});

// LOGOUT

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(4000, () => {
    console.log("Server started at 4000")
})
