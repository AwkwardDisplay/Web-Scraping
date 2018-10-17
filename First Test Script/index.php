
<body style="background: black; color: white;">
<?php

$phantomJS = 'PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs';
$casperJS = '/usr/local/bin/casperjs';
$scrapeFile = 'scrape.js';

//var_dump($dataArray1);

exec("$phantomJS $casperJS $scrapeFile", $output, $status);

//var_dump($output);

for($i = 0; $i < count($output); $i++)
{
	echo $output[$i] . '<br>';
}

?>