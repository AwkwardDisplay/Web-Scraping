// REQUIRE EXPRESS, FS, CHEERIO AND REQUEST MODULES
const express = require('express');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
var app = express();

var result = [];

request('https://www.w3schools.com/nodejs/nodejs_intro.asp', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        
        const $ = cheerio.load(html);

        var sitePanel = $('.w3-panel.w3-note');

        // DISPLAYS THE HTML
        //console.log(siteHeading.html());

        // DISPLAYS THE TEXT ONLY
        // console.log(siteHeading.text());

        // console.log(sitePanel.html());

        // CAN USE FIND TO GET SELECTOR
        // var output = sitePanel.find('p').text();

        // FIND() OR CHILDREN() WORK THE SAME HERE
        // var output = sitePanel.children('p').text();

        // GRABS THE NEXT SELECTORS TEXT
        //var outputTwo = sitePanel.next().text();

        // PRINT THE OUTPUT
        // console.log(output);

        // PRINT THE OUTPUT
        // console.log(outputTwo);

        var count = 0;
        var json = { item : "", link : "" };

        $('.top10 a').each((i, el) => {
            var item = $(el).text();
            var link = $(el).attr('href');
            count++;

            console.log('ITEM ' + count + ' -> ' + item);
            console.log('LINK ' + count + ' -> ' + link + '\n');

           json.item = item;
           json.link = link;

            fs.appendFile('data.json', JSON.stringify(json, null, 4), function(err) {
                console.log('> ' + item + ' Scraped Data has been stored in "data.json".');
                console.log('> ')
            });

        });

        
    }
});
