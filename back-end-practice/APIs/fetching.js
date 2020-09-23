const request = require("request");
const cheerio = require('cheerio');
const url = 'https://bi-girl.net/chanbaekkailu1';

request(url, (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body);
        const imageURL = [];

        $('div.img_wrapper > div.img_wrapper_inner > a.img_a').each((_idx, el) => {
            const url = $(el).attr('href');
            imageURL.push(url);
        });

        console.log(imageURL);
    } else {
        console.log(err);
    }
});
