const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const campgrounds = [
    {name: 'Salmon Creek', image: 'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg'},
    {name: 'Box Hill', image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2747&q=80'},
    {name: 'Cherry Hill', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80'},
    {name: 'Creek', image: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'},
    {name: 'Sovereign Hill', image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'},
    {name: 'Cherry Hill', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80'}
];

mongoose.connect("mongodb://0.0.0.0:27017/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");


const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Box Hill",
//     image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2747&q=80',
//     description: "Beautiful Boxhil campground "
// }, (err, campground) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("New campground");
//         console.log(campground);
//     }
// });

// RESTFUL ROUTES
//
//name      url         verb        desc.
// ================================================
// INDEX    /dogs       GET         Display a list of all dogs
// NEW      /dogs/new   GET         Display form to make a new dog
// CREATE   /dogs       POST        Add new dog to database

app.get('/', (req, res) => {
    res.render("landing");
});

//INDEX
app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: campgrounds});
        }
    });

});

//CREATE
app.post('/campgrounds', (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
   res.render('new');
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
       if(err) {
           console.log(err);
       } else {
           res.render("show", {campground: camp});
       }
    });
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
