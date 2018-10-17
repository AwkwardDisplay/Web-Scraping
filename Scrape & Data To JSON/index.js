// REQUIRE EXPRESS, FS, CHEERIO AND REQUEST MODULES
const express = require('express');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
var app = express();

var result = [];
var scrapeDate = new Date();

app.get('/scrape', function(req, res){
    url = 'https://www.w3schools.com/nodejs/nodejs_intro.asp';

    request(url, function(error, response, html){
        if (!error)
        {

            const $ = cheerio.load(html);
            var sitePanel = $('.w3-panel.w3-note');
            var count = 0;
        
            $('.top10 a').each((i, el) => {
                var item = $(el).text();
                var link = $(el).attr('href');
                var jsonitem = { item : "", link : "" };

                count++;

                jsonitem.item = item;
                jsonitem.link = link;

                result.push(jsonitem);

                console.log('> (' + count + ') ' + item + ' [ SAVED ]');

            });

            var json = { DateOfScrape : "", ScrapeResults : "" };

            json.DateOfScrape = scrapeDate;
            json.ScrapeResults = result;

            fs.writeFile('data.json', JSON.stringify(json, null, 4), function (err) {
                console.log('\n\n\nSCRAPED DATA COLLECTED AND STORED IN " data.json "');
            });

        }
    });

    res.send('Scraped Data has been collected and stored!');

});

// CLEAR CONSOLE WINDOW
process.stdout.write('\033c');

// PORT THE NODE SERVER WILL BE ON
app.listen('5858');
console.log('> SERVER HAS STARTED ');
console.log('> SERVER OPEN ON PORT: 5858');
console.log('> WAITING ON ACCESS TO: ');
console.log('\n\n> " localhost:5858/scrape "');

exports = module.exports = app;