
// CREATE INSTANCE OF CASPER
var casper = require('casper').create({
	
	verbose: true,
	
	viewportSize: {
		width: 1920, 
		height: 1080
	}
	
});
var x = require('casper').selectXPath;
var system = require('system');
var args = system.args;


// BREAKDOWN STRING FROM INDEX.PHP AS KEY => VALUE
var arr = {};
var each = args[4].split(',');
for (i = 0; i < each.length; i++) { 
    var item = each[i].split(':');
	// REPLACING SPECIAL CHARACTERS
	values = item[1].replace(new RegExp("~~", "g"), ' ');
	values = values.replace('$', '&');
	values = values.replace(new RegExp("!", "g"), ',');
	values = values.replace(new RegExp("%", "g"), '(');
	values = values.replace(new RegExp("#", "g"), ')');
	arr[item[0]] = values;
}

// ARRAY FOR SEARCH RESULTS
var results = [];
var titles = [];
var descriptions = [];

// FUNCTION WILL GET URL RESULTS
function getResults() {
	// FIND ALL RESULTS
	var results = document.querySelectorAll('h3.r a');
	
	// PUSH RESULTS TO ARRAY
	return Array.prototype.map.call(results, function(e) {
		
		// RETURN THE URL LINK TO THE SCREEN.
		return e.getAttribute('href');
		
	});
}

function getTitles() {
	
	var titles = document.querySelectorAll('h3.r');
	
	return Array.prototype.map.call(titles, function(e) {
		return e.textContent;
	});
	
}

function getDescriptions() {
	
	var descriptions = document.querySelectorAll('span.st');
	
	return Array.prototype.map.call(descriptions, function(e) {
		return e.textContent;
	});
}

// LAUNCH GOOGLE.COM
casper.start('http://www.google.com');

// WAIT FOR PAGE TO FULLY LOAD
casper.options.waitTimeout = 5000;

// ENTER SEARCH PARAMETER INTO SEARCH INPUT
casper.then(function() {
	
	this.capture('start.png');
	
	this.fill('form[action="/search"]', {
		q: arr['search']
	}, true);
	
	this.capture('SearchInputted.png');
	
});

// WAIT FOR SEARCH RESULTS TO LOAD
casper.wait(2000, function(){
	
});

casper.then(function() {
	
	// DEBUG SCREENSHOT OF RESULTS PAGE
	this.capture('displayResults.png');
	
	// COLLECT AND STORE RESULTS
	results = this.evaluate(getResults);
	
	// COLLECT AND STORE TITLES
	titles = this.evaluate(getTitles);
	
	// COLLECT AND STORE DESCRIPTIONS
	descriptions = this.evaluate(getDescriptions);
	
	// IF DISPLAY PAGES IS 1 SKIP TO END
	if (arr['display'] == 1)
	{
		this.bypass(6);
	}
	
});

// GET NEXT PAGE OF RESULTS
casper.thenClick(x('//*[@id="nav"]/tbody/tr/td[3]/a'), function() {
	
	// CAPTURE SCREEN
	this.capture('nextPage.png');
	
});

casper.then(function() {
	
	// COLLECT AND STORE TITLES [2ND PAGE]
	titles = titles.concat(this.evaluate(getTitles));
	
	// COLLECT AND STORE RESULTS [2ND PAGE]
	results = results.concat(this.evaluate(getResults));
	
	// COLLECT AND STORE DESCRIPTIONS
	descriptions = descriptions.concat(this.evaluate(getDescriptions));
	
	// IF DISPLAY PAGES IS 2 SKIP TO END
	if (arr['display'] == 2)
	{
		this.bypass(3);
	}
	
});

casper.thenClick(x('//*[@id="nav"]/tbody/tr/td[4]/a'), function() {
	
	// CAPTURE SCREEN
	this.capture('thirdPage.png');
	
});

casper.then(function() {
	
	// COLLECT AND STORE TITLES [3RD PAGE]
	titles = titles.concat(this.evaluate(getTitles));
	
	// COLLECT AND STORE RESULTS [3RD PAGE]
	results = results.concat(this.evaluate(getResults));
	
	// COLLECT AND STORE DESCRIPTIONS
	descriptions = descriptions.concat(this.evaluate(getDescriptions));
	
});

casper.then(function final() {
	
	// HOW MANY TITLES HAVE BEEN COLLECTED
	this.echo(titles.length);
	// ALL TITLES COLLECTED
	this.echo(titles.join('-,-'));
	
	// HOW MANY LINKS RESULTS HAVE BEEN COLLECTED
	this.echo(results.length);
	// ALL LINKS COLLECTED
	this.echo(results.join('-,-'));
	
	// HOW MANY DESCRIPTIONS HAVE BEEN COLLECTED
	this.echo(descriptions.length);
	// ALL DESCRIPTIONS COLLECTED
	this.echo(descriptions.join('-,-'));
	
});

// EXIT METHOD JUST IN CASE OF ISSUES
casper.then(function() {
	this.exit();
});

// CALL TO COMPLETE ALL CASPER SCRIPTS
casper.run();