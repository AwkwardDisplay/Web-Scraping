
// CREATE INSTANCE OF CASPER
var casper = require('casper').create();
var x = require('casper').selectXPath;

casper.options.waitTimeout = 5000;

// START CASPER AND SET URL SCRAPING
casper.start('https://www.thinkinsurance.co.uk/contact');




casper.then(function afterStart(){
	
	// FETCHING FIRST HEADER ON PAGE
	var pageName = casper.fetchText(x('/html/body/main/section[1]/div/section[1]/div/h1'));
	
	// DEBUG MESSAGE
	this.echo('<center><b>[Loaded ' + pageName + ' page]<br></b>');
});




// FUNCTION TO CLICK THE T&S LINK ON PAGE
casper.thenClick(x('/html/body/main/section[1]/div/section[1]/div/small/a'), function() {
	
	this.echo('[*Clicked Terms & Conditions Button*]<br>');

});




// WAIT FOR 2 SECONDS
casper.wait(2000, function(){
	
	// FETCH THE NAME OF THE NEXT PAGE
	pageName = casper.fetchText(x('//*[@id="information"]/article/section[1]/div/section[2]/h1'));
	
	// DEBUG MESSAGE
	this.echo('<b>[Loaded ' + pageName + ' page]</b><br>');
	
	// SAVE SCREEN CAPTURE OF CURRENT SCREEN
	this.capture('imagecapture.png');
	
	// DEBUG MESSAGE
	this.echo('[Browser Screen Captured]<br>');
	
});




// FUNCTION TO CLICK ON THE PRIVACY POLICY ON PAGE
casper.thenClick(x('//*[@id="information"]/article/section[2]/div/section/p[1]/a'), function() {
	
	// DEBUG MESSAGE
	this.echo('[*Clicked Privacy Policy Button*]<br>');
	
});



// WAIT FOR 2 SECONDS
casper.wait(2000, function() {
	
	// FETCH THE NAME OF THE NEXT PAGE
	pageName = casper.fetchText(x('//*[@id="information"]/article/section[1]/div/section[2]/h1'));
	
	// DEBUG MESSAGE
	this.echo('<b>[Loaded ' + pageName + ' page]</b><br>');
	
	// SAVE SCREEN CAPTURE OF CURRENT SCREEN
	this.capture('imagecapture2.png');
	
	// DEBUG MESSAGE
	this.echo('[Browser Screen Captured]<br>');
	
});


// EXIT METHOD JUST IN CASE OF ISSUES
casper.then(function() {
	this.exit();
});

// CALL TO COMPLETE ALL CASPER SCRIPTS
casper.run();