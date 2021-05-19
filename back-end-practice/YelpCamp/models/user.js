const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

//from youtube video
// const mongoose = require('mongoose');
//
// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         minlength: 3,
//     },
// }, {
//     timestamps: true,
// });
//
// module.exports = mongoose.model('User', UserSchema);
