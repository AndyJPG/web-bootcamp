const request = require('request');
const url = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22';

request(url, (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const parsedData = JSON.parse(body);
        console.log(parsedData);
    }
});
