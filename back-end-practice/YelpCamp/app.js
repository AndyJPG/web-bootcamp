const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const campgrounds = [
    {name: 'Salmon Creek', image: 'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg'},
    {name: 'Box Hill', image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2747&q=80'},
    {name: 'Cherry Hill', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80'},
    {name: 'Salmon Creek', image: 'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg'},
    {name: 'Box Hill', image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2747&q=80'},
    {name: 'Cherry Hill', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80'}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("landing");
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
    const { name, imageUrl } = req.body;
    const newCampGround = {name: name, image: imageUrl};
    campgrounds.push(newCampGround);

    res.redirect('/campgrounds');
});

app.get("/campgrounds/new", (req, res) => {
   res.render('new');
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
