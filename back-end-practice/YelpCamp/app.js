const express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override");

const seedDB = require("./seeds"),
    User = require("./models/user");

// Requiring routes
const commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

mongoose.connect("mongodb://0.0.0.0:27017/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

// Seeds database
// seedDB()

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Great yelp camp",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// allow every route to have req.user for currentUser
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// RESTFUL ROUTES
//
//name      url         verb        desc.
// ================================================
// INDEX    /dogs       GET         Display a list of all dogs
// NEW      /dogs/new   GET         Display form to make a new dog
// CREATE   /dogs       POST        Add new dog to database

app.use("/", indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
