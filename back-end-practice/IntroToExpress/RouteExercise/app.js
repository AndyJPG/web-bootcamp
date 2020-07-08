const express = require('express');
const app = express();
const port = 3000;

const errorMessage = "Sorry, page not found...What are you doing with your life?";

app.get('/', (req, res) => {
    res.send('Hi there, welcome to my assignment!');
});

app.get('/speak/:animal', (req, res) => {
    const param = req.params.animal.toLowerCase();

    const sound = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        goldfish: "..."
    };

    res.send(`The ${param} says ${sound[param]}`);
});

app.get('/repeat/:word/:times', (req, res) => {
   const { word, times } = req.params;
   let result = word;
   for (let i = 0; i < times - 1; i++) {
       result += ` ${word}`;
   }
   res.send(result);
});

app.get('*', (req, res) => {
    res.send(errorMessage);
});

app.listen(port, () => {
    console.log(`Server is running, listening port ${port}`);
});

