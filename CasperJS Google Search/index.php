<?php

$phantomJS = 'PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs';
$casperJS = '/usr/local/bin/casperjs';
$scrapeFile = 'scrape.js';

// IF NO SEARCH PASSED SEND TO SEARCH FORM
if ($_POST['search'] == null)
{
	header('Location: https://www.thinkinsurance.co.uk/e/edward/scrape/search.php');
}

$Search = 'search:'.$_POST['search'];
$DisplayPages = $_POST['numOfPages'];

// REMOVE ANY SPACES WITH SEARCH RESULT
$Search = str_replace(' ', '~~', $Search);

$Search .= ',display:'. $DisplayPages;

exec("$phantomJS $casperJS $scrapeFile $Search", $output, $status);

// COLLECT TITLES & LINKS FROM OUTPUT ARRAY
$ResultTitles = explode('-,-', $output[1]);
$ResultLinks = explode('-,-', $output[3]);
$ResultDescriptions = explode('-,-', $output[5]);

// REMOVE /URL?Q= FROM START OF URL
$ResultLinks = str_replace('/url?q=', '', $ResultLinks);

// REMOVE GOOGLE ADDED LINK ADDTIONS
for ($i = 0; $i < count($ResultLinks); $i++)
{
	$ResultLinks[$i] = strstr($ResultLinks[$i], '&', true);
}

// REMOVE SEARCH TEXT
$Search = strstr($Search, ':', false);

// REMOVE : FROM THE SEARCH DISPLAY
$Search = str_replace(':', '', $Search);

// REMOVE SPACE REPLACER
$Search = str_replace('~~', ' ', $Search);

// REMOVE ANY ADDITIONAL PARAMETERS WITHIN $SEARCH
$Search = strstr($Search, ',', true);

include 'search.php';

// DISPLAY RESULTS
echo 'Searched for: "' . $Search . '"<br>';
echo 'Showing '.$DisplayPages.' page(s) of results';

echo '<ol>';
	for ($i = 0; $i < count($ResultLinks); $i++)
	{
		// DISPLAY RESULTS AND LINKS
		echo '<li><a href="'.$ResultLinks[$i].'">'.$ResultTitles[$i].'</a><br>';
		echo '<em>'.$ResultDescriptions[$i].'</em></li>';
	}

echo '</ol>';


?>