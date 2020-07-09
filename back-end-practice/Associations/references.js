const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo");

const Post = require("./models/post");
const User = require("./models/user");

// Reference data using embed method
// POST - title, content
// const postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// })
// const Post = mongoose.model("Post", postSchema)

// USER - email, name
// const userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     posts: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }
//     ]
// })
//
// const User = mongoose.model("User", userSchema)

// User.create({
//     email: "bob@gmail.com",
//     name: "bob ilil"
// })

// Post.create({
//     title: "How to cook pt 4",
//     content: "sd jiknill"
// }, (err, post) => {
//     if(err) {
//         console.log(err);
//     } else {
//         User.findOne({email: "bob@gmail.com"}, (err, foundUser) => {
//             if(err) {
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save((err, data) => {
//                     if(err) {
//                         console.log(err);
//                     } else {
//                         console.log(data)
//                     }
//                 })
//             }
//         })
//     }
// })

// Find user
// and find all posts

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// })
