const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo");

// Reference data using embed method
// POST - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
})
const Post = mongoose.model("Post", postSchema)

// USER - email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
})

const User = mongoose.model("User", userSchema)

const newUser = new User({
    email: "hermione@gmail.com",
    name: "Hermione Granger"
})

// newUser.posts.push({
//     title: "How to bre polyjuice",
//     content: "Just kidding"
// })
//
// newUser.save((err, user) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// })

// const newPost = new Post({
//     title: "Reflections on apples",
//     content: "They are delicious"
// });
// newPost.save((err, post) => {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log(post)
//     }
// })

// User.findOne({name: "Hermione Granger"}, (err, user) => {
//     if(err) {
//         console.log(err)
//     } else {
//         user.posts.push({
//             title: "3 things i hate",
//             content: "Voldemort, Voldemort"
//         });
//         user.save((err, user) => {
//             if(err) {
//                 console.log(err);
//             } else {
//                 console.log(user)
//             }
//         })
//     }
// })
