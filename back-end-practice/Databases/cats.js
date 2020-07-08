const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/demo");

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

// const george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });
//
// george.save((err, cat) => {
//     if(err) {
//         console.log("Error");
//     } else {
//         console.log("Cat saved");
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Snow White",
//     age: 15,
//     temperament: "Bland"
// }, (err, cat) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(cat);
//     }
// });

Cat.find({}, (err, cats) => {
    if(err) {
        console.log("Error");
        console.log(err);
    } else {
        console.log("All cats");
        console.log(cats);
    }
});
