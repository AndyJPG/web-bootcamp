const mongoose = require("mongoose");

const Campground = require("./models/campground"),
    Comment = require("./models/comment");

const campgroundsData = [
    {
        name: 'Salmon Creek',
        image: 'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ligula eros, imperdiet at nibh vitae, fermentum volutpat diam. Suspendisse bibendum pellentesque velit vitae vehicula. Morbi dignissim libero quis nisl tempus consequat. Maecenas ut nisl ut nunc egestas fringilla. Pellentesque imperdiet lacinia leo, at commodo sapien scelerisque eu. Curabitur blandit nulla a blandit ornare. Proin efficitur justo in neque pulvinar aliquet."
    },
    {
        name: 'Box Hill',
        image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2747&q=80',
        description: "Morbi sit amet tortor neque. Quisque vel sagittis erat. In suscipit magna nec massa elementum commodo. Vestibulum egestas augue consequat metus tempor luctus. Donec eget libero non diam rhoncus feugiat. In hac habitasse platea dictumst. Ut aliquet tristique magna ac euismod. Fusce ullamcorper felis magna. Aliquam eget facilisis metus."
    },
    {
        name: 'Cherry Hill',
        image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80',
        description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce vitae gravida arcu. Proin dignissim consequat felis. Nunc molestie efficitur tortor vel tempor. Aenean lectus lorem, porta vel ultrices et, consequat in eros. Sed id nisi quis est facilisis tincidunt ut in nisl. Aenean nec finibus lorem. Donec vitae libero augue. Nam pretium tempor sapien ut condimentum. Duis suscipit augue at turpis sollicitudin mattis."
    },
    {
        name: 'Creek',
        image: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien erat, aliquet ut sagittis et, aliquam ac mi. Vestibulum imperdiet mi ut nunc tempus aliquam. Vestibulum et ullamcorper leo. Nam tristique tempor ex, blandit accumsan turpis. Etiam in risus vel libero lobortis laoreet. Donec ac quam dolor. Maecenas et ullamcorper lectus, non cursus purus. Fusce ut tincidunt quam. Sed tincidunt ullamcorper velit sed pellentesque. Integer sollicitudin mauris augue, eu tristique felis dignissim at. Maecenas euismod mauris ac justo venenatis sagittis. Donec risus sem, ornare id fringilla vel, feugiat vitae est. Maecenas imperdiet ex eget pellentesque sagittis."
    }
];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, (err) => {
        // if(err) {
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        // // Add a few campgrounds
        // campgroundsData.forEach((seed) => {
        //     Campground.create(seed, (err, campground) => {
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             console.log("added campground " + campground._id + ", " + seed.name);
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, (err, comment) => {
        //                     if(err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment!");
        //                     }
        //                 }
        //             )
        //         }
        //     })
        // })
    })
}
module.exports = seedDB;
