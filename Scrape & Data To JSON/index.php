<?php
// FILE TO ACCESS GENERATED JSON FILE AND DISPLAY RESULTS

// THE SCRAPE GENERATED JSON FILE
$JSON_FILE = file_get_contents('data.json');
$SCRAPEDATA = array();

if (filesize('data.json'))
{
    $JSON_ITERATOR = new RecursiveIteratorIterator(
        new RecursiveArrayIterator(json_decode($JSON_FILE, TRUE)),
        RecursiveIteratorIterator::SELF_FIRST);

echo '<div style="
    font-family: Helvetica;
    text-align: center;
    top: 40%;
    left: 36%;">';
    foreach ($JSON_ITERATOR as $KEY => $VAL) 
    {
        if (is_array($VAL))
        {
            echo "<b>KEY > $KEY</b>:<br><br>";
        } 
        else
        {
            echo "$KEY => $VAL<br>";
        }
    }
echo '</div>';
} 
else
{
    echo '<iframe src="http://localhost:5858/scrape" style="display: none;"></iframe>';
    echo '<h1 style="
        font-family: Helvetica;
        text-align: center;
        position: fixed;
        top: 40%;
        left: 36%;
        ">JSON File Empty</h1>';
}

?>

